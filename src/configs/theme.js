import {DefaultTheme} from 'react-native-paper';

import colors from '../constants/colors';

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.PRIMARY,
    inactive: colors.GRAY,
    background: '#fff',
    danger: colors.DANGER,
    lightGray: colors.LIGHT_GRAY,
    text: colors.TEXT,
  },
};

export const buttonTheme = {
  ...theme,
  dark: false,
  colors: {
    ...theme.colors,
    primary: colors.CONTAINER,
  },
};

export default theme;
