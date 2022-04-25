import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';

import CameraScreen from '../screens/Camera';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import LogoHeader from '../components/LogoHeader';
import Placeholder from '../screens/Placeholder';
import HomeScreen from '../screens/Home';

export default createStackNavigator(
  {
    [urls.HOME_MAIN]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'SPSHMD',
        headerLeft: () => <LogoHeader />,
      }),
    },
    [urls.HOME_CAMERA]: {
      screen: CameraScreen,
      navigationOptions: () => ({
        title: 'Analyse',
      }),
    },
  },
  {
    initialRouteName: urls.HOME_MAIN,
    defaultNavigationOptions: () => ({
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);
