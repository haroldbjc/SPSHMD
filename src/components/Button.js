import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

import {buttonTheme} from '../configs/theme';
import colors from '../constants/colors';

const Button = ({title, mode = 'contained', ...props}) => {
  return (
    <PaperButton
      mode={mode}
      labelStyle={styles.labelStyle}
      style={styles.viewStyle}
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
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 0,
    // borderColor: colors.ACCENT,
    // borderWidth: 1,
  },
  labelStyle: {
    color: colors.ACCENT,
    fontFamily: 'NotoSans-Regular',
  },
});

export default Button;
