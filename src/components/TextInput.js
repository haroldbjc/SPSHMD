import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

import theme from '../configs/theme';

const TextInput = ({mode = 'outlined', outlineColor = 'transparent', ...props}) => {
  return (
    <PaperTextInput
      mode={mode}
      activeactiveOutlineColor={theme.colors.primary}
      labelStyle={styles.labelStyle}
      style={styles.viewStyle}
      theme={theme}
      contentStyle={styles.contentStyle}
      activeOutlineColor={theme.colors.primary}
      outlineColor="transparent"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20,
    color: theme.colors.primary,
    fontFamily: 'NotoSans-Regular',
  },
  viewStyle: {
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: theme.colors.lightGray,
    // borderColor: colors.ACCENT,
    // borderWidth: 1,
  },
  labelStyle: {
    color: theme.colors.primary,
    fontFamily: 'NotoSans-Regular',
  },
});
export default TextInput;
