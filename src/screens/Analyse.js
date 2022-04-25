import React, {useState, useCallback} from 'react';
import {Text, StyleSheet, SafeAreaView, View, Image, ScrollView, Pressable} from 'react-native';
import Button from '../components/Button';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import urls from '../constants/urls';
import Checkbox from '../components/Checkbox';
import {NavigationActions, StackActions} from 'react-navigation';

const includeExtra = true;

const AnalyseScreen = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [analyzerOptions, setAnalyzerOptions] = useState(settings);

  const handleAnalyze = () => {
    // console.log('Analyzing...');
    // navigation.reset(
    //   [
    //     NavigationActions.navigate({
    //       routeName: urls.MAIN_ANALYSE,
    //       params: {response},
    //     }),
    //   ],
    //   0,
    // );
    navigation.dispatch(
      StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({
            routeName: urls.MAIN_HOME,
          }),
          NavigationActions.navigate({
            routeName: urls.MAIN_ANALYSE,
            params: {response},
          }),
        ],
      }),
    );
    // navigation.navigate(urls.MAIN_ANALYSE, {response});
    return;
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

  return (
    <SafeAreaView style={styles.container}>
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
              <Icon name="image-not-supported" size={100} color={colors.ACCENT} />
              <Text style={styles.text}>Please take/select an image to analyse</Text>
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
                  disabled={!response?.assets}
                />
                <Text style={styles.smallText}>{title}</Text>
              </View>
            );
          })}
        </View>
        <Button icon="database-arrow-up" title="Analyse" disabled={!response} onPress={() => handleAnalyze()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
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
    title: 'Disable Analyzer',
    value: 'disableAnalyzer',
    checked: 'unchecked',
  },
  {
    title: 'Ignore Location',
    value: 'ignoreLocation',
    checked: 'unchecked',
  },
];

export default AnalyseScreen;
