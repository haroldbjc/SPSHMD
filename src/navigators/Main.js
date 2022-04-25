import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';

import urls from '../constants/urls';

import {standardCardStyle, standardHeaderStyle, standardHeaderTitleStyle} from '../configs/styles';

import BottomNavigator from './BottomNav';
import AnalyseNavigator from './Analyse';

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
  },
  {
    initialRouteName: urls.MAIN_HOME,
    defaultNavigationOptions: () => ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
    }),
  },
);
