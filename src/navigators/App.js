import {createSwitchNavigator} from 'react-navigation';

import urls from '../constants/urls';

import MainNavigator from './Main';
import AuthNavigator from './Auth';

export default createSwitchNavigator(
  {
    [urls.APP_MAIN]: MainNavigator,
    [urls.AUTH_MAIN]: AuthNavigator,
  },
  {
    initialRouteName: urls.APP_MAIN,
  },
);
