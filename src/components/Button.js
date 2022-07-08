import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

import {buttonTheme} from '../configs/theme';
import colors from '../constants/colors';

const Button = ({title, style, labelStyle, mode = 'contained', ...props}) => {
  return (
    <PaperButton
      mode={mode}
      labelStyle={[styles.labelStyle, labelStyle]}
      style={[styles.viewStyle, style]}
      theme={buttonTheme}
      contentStyle={styles.contentStyle}
      {...props}
    >
      {title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  viewStyle: {
    maxWidth: '100%',
    marginVertical: 4,
    borderRadius: 8,
  },
  labelStyle: {
    color: colors.ACCENT,
    fontFamily: 'NotoSans-Regular',
  },
});

export default Button;
