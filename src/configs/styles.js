import {Platform, StatusBar} from 'react-native';

import colors from '../constants/colors';
import {elevationShadowStyle} from '../utils/shadow';

export const standardHeaderStyle = {
  ...elevationShadowStyle(0),
  backgroundColor: colors.CONTAINER,
  borderBottomWidth: 0,
  ...Platform.select({
    android: {
      height: StatusBar.currentHeight + 40,
    },
    ios: {
      height: 66,
    },
  }),
};

export const standardHeaderTitleStyle = {
  fontWeight: '700',
};

export const standardCardStyle = {
  backgroundColor: colors.CONTAINER,
};

export const textInputStyle = {
  backgroundColor: colors.CONTAINER,
};
