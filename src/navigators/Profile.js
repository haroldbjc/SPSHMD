import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import ProfileScreen from '../screens/Profile';

export default createStackNavigator(
  {
    [urls.PROFILE_MAIN]: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerShown: false,
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
