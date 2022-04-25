import React from 'react';
import {StyleSheet, useColorScheme, View, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DemoResponse} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import urls from '../constants/urls';
import Button from '../components/Button';
import colors from '../constants/colors';
import {NavigationActions, StackActions} from 'react-navigation';

const AnalyseSummaryScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const response = navigation.getParam('response');
  console.log('response', response);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView>
      <View style={[backgroundStyle, styles.sectionContainer]}>
        <Icon name="home-repair-service" size={100} color={isDarkMode ? Colors.white : Colors.black} />
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
              </View>
            ))}
        </View>
        <DemoResponse>{response}</DemoResponse>
        <Button
          title="Back to Home"
          onPress={() => {
            navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: urls.MAIN_HOME,
                  }),
                ],
              }),
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
  },
  sectionDescription: {
    marginTop: 8,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
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
});

export default AnalyseSummaryScreen;
