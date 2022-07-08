import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';

import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import HistoryScreen from '../screens/History';
import HomeScreen from '../screens/Home';

export default createStackNavigator(
  {
    [urls.HOME_MAIN]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    [urls.HOME_HISTORY]: {
      screen: HistoryScreen,
      navigationOptions: () => ({
        title: 'History',
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
