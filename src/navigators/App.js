import {createSwitchNavigator} from 'react-navigation';

import urls from '../constants/urls';

import MainNavigator from './Main';

export default createSwitchNavigator(
  {
    [urls.APP_MAIN]: MainNavigator,
  },
  {
    initialRouteName: urls.APP_MAIN,
  },
);
