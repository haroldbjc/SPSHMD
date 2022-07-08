import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {SafeAreaView, Image, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const Auth = ({navigation}) => {
  useEffect(() => {
    // Wait 1 second before checking if user is logged in
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainHome'})],
          }),
        );
      } else {
        console.log('No token found');
        navigation.reset(
          [
            NavigationActions.navigate({
              routeName: 'AuthLogin',
            }),
          ],
          0,
        );
      }
    }, 1000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Image source={require('../assets/images/outline_radar_black_36dp.png')} style={styles.logo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Auth;
