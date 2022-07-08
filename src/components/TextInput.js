import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

import theme from '../configs/theme';
import colors from '../constants/colors';

const TextInput = ({mode = 'outlined', outlineColor = 'transparent', ...props}) => {
  return (
    <PaperTextInput
      mode={mode}
      activeactiveOutlineColor={colors.ACCENT}
      labelStyle={styles.labelStyle}
      style={styles.viewStyle}
      theme={theme}
      selectionColor={colors.ACCENT}
      contentStyle={styles.contentStyle}
      activeOutlineColor={colors.ACCENT}
      outlineColor="transparent"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    fontFamily: 'NotoSans-Regular',
    color: colors.ACCENT,
    minWidth: '45%',
    maxWidth: '100%',
    marginVertical: 4,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: '#F4F6FF',
    // borderColor: colors.ACCENT,
    // borderWidth: 1,
  },
  labelStyle: {
    color: colors.ACCENT,
    fontFamily: 'NotoSans-Regular',
  },
});
export default TextInput;
