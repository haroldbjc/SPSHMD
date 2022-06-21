import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';

import urls from '../constants/urls';

import {standardCardStyle, standardHeaderStyle, standardHeaderTitleStyle} from '../configs/styles';

import BottomNavigator from './BottomNav';
import AnalyseNavigator from './Analyse';
import LoginScreen from '../screens/Login';

export default createStackNavigator(
  {
    [urls.MAIN_HOME]: {
      screen: BottomNavigator,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    [urls.MAIN_ANALYSE]: {
      screen: AnalyseNavigator,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    [urls.AUTH_LOGIN]: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: urls.AUTH_LOGIN,
    defaultNavigationOptions: () => ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
    }),
  },
);
