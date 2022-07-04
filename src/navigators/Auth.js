import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import Auth from '../screens/Auth';

export default createStackNavigator(
  {
    [urls.AUTH_LOGIN]: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    [urls.AUTH_REGISTER]: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        title: 'Register',
      }),
    },
    [urls.AUTH_CHECK]: {
      screen: Auth,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: urls.AUTH_CHECK,
    defaultNavigationOptions: () => ({
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);
