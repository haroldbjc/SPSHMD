import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationActions} from 'react-navigation';

import ProgressHUD from '../components/ProgressHUD';

const Auth = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    // Wait 1 second before checking if user is logged in
    setIsLoading(true);
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
      setIsLoading(false);
    }, 1000);
  }, [navigation]);

  return <ProgressHUD isVisible={isLoading} title={'Initializing... '} overlayColor={'white'} />;
};

export default Auth;
