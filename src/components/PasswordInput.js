import React from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';

import colors from '../constants/colors';

import TextInput from './TextInput';

const PasswordInput = ({showPassword, onPress, ...props}) => {
  return (
    <TextInput
      right={
        showPassword ? (
          <PaperTextInput.Icon name="eye" onPress={() => onPress()} color={colors.ACCENT} />
        ) : (
          <PaperTextInput.Icon name="eye-off" onPress={() => onPress()} color={colors.ACCENT} />
        )
      }
      {...props}
    />
  );
};

export default PasswordInput;
