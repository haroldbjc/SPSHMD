import {useColorScheme} from 'react-native';

import colors from '../constants/colors';

export const DarkMode = () => {
  return useColorScheme() === 'dark' ? colors.BLACK : colors.WHITE;
};

export const LightMode = () => {
  return useColorScheme() === 'dark' ? colors.WHITE : colors.BLACK;
};
