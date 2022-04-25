import {createStackNavigator, CardStyleInterpolators} from 'react-navigation-stack';
import {standardHeaderTitleStyle, standardHeaderStyle, standardCardStyle} from '../configs/styles';
import urls from '../constants/urls';
import AnalyseSummaryScreen from '../screens/AnalyseSummary';

export default createStackNavigator(
  {
    [urls.ANALYSE_SUMMARY]: {
      screen: AnalyseSummaryScreen,
      navigationOptions: () => ({
        title: 'Analyse Summary',
      }),
    },
  },
  {
    initialRouteName: urls.ANALYSE_SUMMARY,
    defaultNavigationOptions: () => ({
      headerStyle: standardHeaderStyle,
      headerTitleStyle: standardHeaderTitleStyle,
      cardStyle: standardCardStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
  },
);
