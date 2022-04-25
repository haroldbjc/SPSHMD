import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import Placeholder from '../screens/Placeholder';
import LogoHeader from '../components/LogoHeader';

export default createStackNavigator(
  {
    [urls.PROFILE_MAIN]: {
      screen: Placeholder,
      navigationOptions: () => ({
        title: 'SPSHMD',
        headerLeft: () => <LogoHeader />,
      }),
    },
  },
  {
    initialRouteName: urls.PROFILE_MAIN,
    defaultNavigationOptions: () => ({
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);
