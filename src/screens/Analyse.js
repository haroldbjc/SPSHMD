import React, {useState, useCallback} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Image, ScrollView, Pressable, Platform, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {Dialog, Portal, Chip} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

import ProgressHUD from '../components/ProgressHUD';
import {uploadImage, metalDetection, postResults} from '../api';
import Checkbox from '../components/Checkbox';
import colors from '../constants/colors';
import Button from '../components/Button';
import {getRandomLocation} from '../utils/getRandomLocations';
import {MetalWeight} from '../utils/metalWeight';
const includeExtra = true;

const AnalyseScreen = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [analyzerOptions, setAnalyzerOptions] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({uri: null, base64: null});
  const [visible, setVisible] = useState(false);
  const [geoLocation, setGeoLocation] = useState();
  const [detectedMetal, setDetectedMetal] = useState(false);
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [region, setRegion] = React.useState({
    latitude: 5.3553808,
    longitude: 100.2912276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleHideDialog = async (message) => {
    setVisible(false);
    setImage(false);
    if (message === 'Submit Data') {
      setLoadingDialog(true);
      const userdata = await AsyncStorage.getItem('user').then((user) => {
        return JSON.parse(user);
      });
      const data = {
        userid: userdata.id,
        username: userdata.username,
        detectedMetal: detectedMetal,
        geoLocation: geoLocation,
      };
      try {
        const response2 = await postResults(data);
        if (response2) {
          showMessage({
            message: 'Success',
            description: 'You have successfully submitted your data.',
            type: 'success',
          });
        } else {
          console.log('Error');
        }
      } catch (error) {
        showMessage({
          message: 'Error',
          description: 'Something went wrong.',
          type: 'danger',
        });
      } finally {
        if (response) {
          setLoadingDialog(false);
          setResponse(null);
        }
      }
    }
  };

  // send random locations to server
  const handleRandomPress = async () => {
    let randomLocations = getRandomLocation(region, 0.1);
    const userdata = await AsyncStorage.getItem('user').then((user) => {
      return JSON.parse(user);
    });
    const data = {
      userid: userdata.id,
      username: userdata.username,
      detectedMetal: MetalWeight[Math.floor(Math.random() * MetalWeight.length)],
      geoLocation: {
        ...geoLocation,
        coords: {...geoLocation.coords, latitude: randomLocations.latitude, longitude: randomLocations.longitude},
      },
    };
    console.log(data.detectedMetal);
    try {
      const response2 = await postResults(data);
      if (response2) {
        showMessage({
          message: 'Success',
          description: 'You have successfully submitted your data.',
          type: 'success',
        });
      } else {
        console.log('Error');
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Something went wrong.',
        type: 'danger',
      });
    } finally {
      if (response) {
        setLoadingDialog(false);
        setResponse(null);
      }
    }
  };

  const createFormData = (photo) => {
    const data = new FormData();
    data.append('photo', {
      name: photo.fileName,
      type: photo.type || 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    return data;
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Location Permission',
        message: 'This app needs access to your location ' + 'for location analysis.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAnalyze = async () => {
    setLoadingDialog('Analyzing...');
    setLoading(true);
    let coluorCorrected = false;

    let result;
    if (!isIgnoreLocation) {
      if (!geoLocation) {
        requestLocationPermission();
      }
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            setGeoLocation(position);
          },
          (error) => {
            console.log(error);
            setGeoLocation(null);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } catch (error) {
        console.log(error);
        setGeoLocation(null);
      }
    }
    if (isRunningColorCorrection) {
      try {
        setLoadingDialog('Running color correction...');
        result = await uploadImage(createFormData(response.assets[0]));
      } catch (error) {
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
      } finally {
        if (result?.result) {
          coluorCorrected = result;
        } else {
          showMessage({
            message: 'Error',
            description: 'Color correction failed.',
            type: 'danger',
          });
          return;
        }
      }
    }
    await handleDetection(coluorCorrected);
    setLoading(false);
    setVisible(true);
    return;
  };

  const handleDetection = async (coluorCorrected) => {
    //setLoading(true);
    let result;
    let file = response.assets[0].uri;
    setLoadingDialog('Detecting metal...');

    // convert base64 to file then return uri if image.base64 is not null
    if (coluorCorrected?.image) {
      try {
        // set RNFS temp path for image
        file = RNFS.TemporaryDirectoryPath + '/' + coluorCorrected.fileName;
        await RNFS.writeFile(file, coluorCorrected.image, 'base64');
      } catch (error) {
        console.log(error);
      } finally {
        // add prefix to file uri
        file = 'file://' + file;
      }
    }

    let tempImage = {
      uri: file,
      base64: coluorCorrected?.image,
      fileName: response.assets[0].fileName,
      type: response.assets[0].type,
    };

    try {
      result = await metalDetection(createFormData(tempImage));
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
    } finally {
      // setLoading(false);
      console.log(result);
      setDetectedMetal(result?.result);
      setImage(tempImage);
      // setResponse(null);
    }
  };

  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const onCheckboxPress = useCallback(
    (value) => {
      setAnalyzerOptions(
        analyzerOptions.map((option) => {
          if (option.value === value) {
            return {...option, checked: option.checked === 'checked' ? 'unchecked' : 'checked'};
          }
          return option;
        }),
      );
    },
    [analyzerOptions],
  );

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  };

  const isRunningColorCorrection =
    analyzerOptions.find((option) => option.value === 'runColorCorrection').checked === 'checked';

  const isIgnoreLocation = analyzerOptions.find((option) => option.value === 'ignoreLocation').checked === 'checked';
  const locationText = (location) => {
    if (isIgnoreLocation) {
      return 'Location ignored';
    }
    if (location?.coords) {
      return `Location: ${location.coords.latitude}, ${location.coords.longitude}`;
    }
    return 'Location not available';
  };

  if (loading) {
    return <ProgressHUD isVisible title={loadingDialog} overlayColor={'white'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView>
        <View style={styles.imageContainer}>
          {response?.assets &&
            response?.assets.map(({uri}) => (
              <View key={uri} style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  source={{uri: uri}}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{flex: 1, borderRadius: 10}}
                />
                <Pressable style={styles.deleteIcon} onPress={() => setResponse(null)}>
                  <Icon name="cancel" size={35} color={colors.DANGER} />
                </Pressable>
              </View>
            ))}
          {!response?.assets && (
            <View style={styles.noImage}>
              <Icon name="image-not-supported" size={100} color={colors.LIGHT_GRAY} />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options, icon}) => {
            return <Button key={title} icon={icon} title={title} onPress={() => onButtonPress(type, options)} />;
          })}
        </View>
        <View style={styles.analyserContainer}>
          <Text style={styles.analyserTitle}>Analyzer Options</Text>
          {settings.map(({title, value, checked}) => {
            return (
              <View key={value} style={styles.checkboxContainer}>
                <Checkbox
                  key={value}
                  status={analyzerOptions.find((items) => value === items.value).checked}
                  onPress={() => onCheckboxPress(value)}
                />
                <Text style={styles.smallText}>{title}</Text>
              </View>
            );
          })}
        </View>
        <Button icon="database-arrow-up" title="Analyse" disabled={!response} onPress={() => handleAnalyze()} />
        {/* <Button icon="database-arrow-down" title="Delete token" onPress={() => removeToken()} /> */}
        {/* <Button icon="database-arrow-down" title="Logout" onPress={() => handleRandomPress()} /> */}
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(true)} style={styles.dialog}>
          <View style={styles.imageContainer}>
            {image && (
              <View style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  source={image.uri ? {uri: image.uri} : {uri: `data:image/png;base64,${image.base64}`}}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{flex: 1, borderRadius: 10}}
                />
              </View>
            )}
            {!image && (
              <View style={styles.noImage}>
                <Icon name="image-not-supported" size={100} color={colors.LIGHT_GRAY} />
              </View>
            )}
          </View>
          <Dialog.Content>
            <Chip
              icon={isRunningColorCorrection ? 'checkbox-marked-circle-outline' : 'close-circle-outline'}
              style={styles.chip}
            >
              Color corrected: {isRunningColorCorrection ? 'Yes' : 'No'}
            </Chip>
            <Chip icon={isIgnoreLocation ? 'map-marker-off' : 'map-marker'} style={styles.chip}>
              {locationText(geoLocation)}
            </Chip>
            <Chip icon={'radar'} style={styles.chip}>
              Result: {detectedMetal}
            </Chip>
            {/* <Paragraph>Upload this image for metal detection?</Paragraph>
            <Paragraph>- Color corrected: {isRunningColorCorrection ? 'Yes' : 'No'}</Paragraph>
            <Paragraph>{locationText(geoLocation)}</Paragraph>
            <Text style={styles.dialogText}>Result: {detectedMetal}</Text> */}
          </Dialog.Content>
          <Dialog.Actions>
            <View style={styles.buttonContainer}>
              <Button onPress={() => handleHideDialog('Cancel')} title={'Cancel'} />
              <Button onPress={() => handleHideDialog('Submit Data')} title={'Submit Data'} />
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 10,
  },
  imageContainer: {
    height: 400,
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.ACCENT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.WHITE,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    color: colors.ACCENT,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 15,
    color: colors.ACCENT,
    textAlign: 'center',
  },
  analyserTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.ACCENT,
    marginBottom: 10,
  },
  analyserContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.CONTAINER,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: colors.GRAY,
    borderRadius: 10,
  },
  chip: {
    margin: 1,
    backgroundColor: colors.ACCENT,
  },
  dialogTitle: {
    fontSize: 20,
    marginTop: 1,
    marginBottom: 5,
  },
});

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
    icon: 'camera',
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
    icon: 'image-search',
  },
];

const settings = [
  {
    title: 'Run color correction',
    value: 'runColorCorrection',
    checked: 'checked',
  },
  {
    title: 'Ignore Location',
    value: 'ignoreLocation',
    checked: 'unchecked',
  },
];

export default AnalyseScreen;
