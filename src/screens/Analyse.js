import React, {useState, useCallback, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Image, ScrollView, Pressable, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {Dialog, Portal} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

import ProgressHUD from '../components/ProgressHUD';
import {uploadImage, metalDetection, postResults} from '../api';
import Checkbox from '../components/Checkbox';
import colors from '../constants/colors';
import Button from '../components/Button';
import {requestLocationPermission} from '../utils/locationAccess';
import createFormData from '../utils/createFormData';
import Chip from '../components/Chip';
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

  // useEffect services
  useEffect(() => {
    // get current location
    if (!geoLocation) {
      requestLocationPermission();
      try {
        Geolocation.getCurrentPosition((position) => {
          setGeoLocation(position);
        });
      } catch (error) {
        console.log(error);
        setGeoLocation(null);
      }
    }
  }, []);

  // submit result to server
  const handleSubmitData = async () => {
    const userdata = await AsyncStorage.getItem('user').then((user) => {
      return JSON.parse(user);
    });
    console.log(geoLocation);
    const data = {
      userid: userdata.id,
      username: userdata.username,
      detectedMetal: detectedMetal,
      latitude: geoLocation?.coords?.latitude,
      longitude: geoLocation?.coords?.longitude,
    };
    try {
      const result = await postResults(data);
      if (result) {
        showMessage({
          message: 'Success',
          description: 'You have successfully submitted your data.',
          type: 'success',
        });
      } else {
        console.log('Error');
      }
      setResponse(null);
      setImage(false);
      setVisible(false);
      setLoading(false);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Something went wrong.',
        type: 'danger',
      });
    }
  };

  // handle analyse button
  const handleAnalyze = async () => {
    setLoadingDialog('Analyzing...');
    setLoading(true);
    setImage(false);
    let coluorCorrected = false;

    if (isRunningColorCorrection) {
      try {
        setLoadingDialog('Running color correction...');
        const result = await uploadImage(createFormData(response.assets[0]));
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
      } catch (error) {
        console.log(error);
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
        setLoading(false);
        return;
      }
    }
    await handleDetection(coluorCorrected);
  };

  // handle detection
  const handleDetection = async (coluorCorrected) => {
    let file = response.assets[0].uri;

    // convert base64 to file then return uri if image.base64 is not null
    if (coluorCorrected?.image) {
      try {
        // set RNFS temp path for image
        file = RNFS.TemporaryDirectoryPath + '/' + coluorCorrected.fileName;
        await RNFS.writeFile(file, coluorCorrected.image, 'base64');
      } catch (error) {
        console.log(error);
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
        setLoading(false);
        return;
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
      setLoadingDialog('Detecting metal...');
      const result = await metalDetection(createFormData(tempImage));
      setDetectedMetal(result?.result);
      setImage(tempImage);
      setVisible(true);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
      setLoading(false);
    } finally {
      setLoading(false);
      setLoadingDialog(false);
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
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(true)} style={styles.dialog}>
          <View style={styles.imageContainer}>
            {image && (
              <View style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  source={image.base64 ? {uri: `data:image/png;base64,${image.base64}`} : {uri: image.uri}}
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
          <View styles={styles.content}>
            <Chip label={'Color Corrected'} value={isRunningColorCorrection ? 'Yes' : 'No'} icon="palette" />
            <Chip label={'Location'} value={locationText(geoLocation)} icon="location-on" />
            <Chip label={'Metal Detected'} value={detectedMetal} icon="compass-calibration" />
          </View>
          <Dialog.Actions>
            <View style={styles.buttonContainer}>
              <Button onPress={() => setVisible(false)} title={'Cancel'} />
              <Button onPress={() => handleSubmitData('Submit Data')} title={'Submit Data'} />
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
  content: {
    margin: 10,
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
