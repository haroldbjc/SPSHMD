import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import Placeholder from '../screens/Placeholder';
import LogoHeader from '../components/LogoHeader';
import LoginScreen from '../screens/Login';

export default createStackNavigator(
  {
    [urls.AUTH_LOGIN]: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: 'SPSHMD',
      }),
    },
  },
  {
    initialRouteName: urls.AUTH_LOGIN,
    defaultNavigationOptions: () => ({
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);