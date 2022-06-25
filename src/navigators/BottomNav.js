import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../configs/theme';

import HomeNavigator from './Home';
import AnalyseScreen from '../screens/Analyse';
import ProfileNavigator from './Profile';

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: () => ({
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} size={24} />,
      }),
    },
    Analyse: {
      screen: AnalyseScreen,
      navigationOptions: () => ({
        tabBarLabel: 'Analyse',
        tabBarIcon: ({tintColor}) => <Icon name="camera-alt" color={tintColor} size={24} />,
      }),
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: () => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon name="person" color={tintColor} size={24} />,
      }),
    },
  },
  {
    initialRouteName: 'Analyse',
    activeColor: theme.colors.primary,
    inactiveColor: theme.colors.inactive,
    barStyle: {backgroundColor: '#fff'},
    shifting: true,
  },
);
