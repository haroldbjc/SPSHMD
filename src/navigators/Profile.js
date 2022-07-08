import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';

import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import ProfileScreen from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';

export default createStackNavigator(
  {
    [urls.PROFILE_MAIN]: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    [urls.PROFILE_EDIT]: {
      screen: EditProfile,
      navigationOptions: () => ({
        title: 'Edit Profile',
      }),
    },
    [urls.PROFILE_CHANGE_PASSWORD]: {
      screen: ChangePassword,
      navigationOptions: () => ({
        title: 'Change Password',
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
