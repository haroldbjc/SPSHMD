import React from 'react';
import {Checkbox as PaperCheckBox} from 'react-native-paper';

import colors from '../constants/colors';

const Checkbox = ({status, onPress, ...otherProps}) => {
  return (
    <PaperCheckBox.Android
      status={status}
      uncheckedColor={colors.ACCENT}
      color={colors.ACCENT}
      onPress={onPress}
      {...otherProps}
    />
  );
};

export default Checkbox;
