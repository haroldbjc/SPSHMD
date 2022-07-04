import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressHUD from '../components/ProgressHUD';
import {NavigationActions} from 'react-navigation';

const Auth = ({navigation}) => {
  useEffect(() => {
    // Wait 1 second before checking if user is logged in
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('MainHome');
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

  return <ProgressHUD isVisible title={'Initializing... '} overlayColor={'white'} />;
};

export default Auth;
