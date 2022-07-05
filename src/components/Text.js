import React from 'react';
import {Text as PaperText} from 'react-native-paper';

const Text = ({children, style, ...props}) => {
  return (
    <PaperText style={[style, styles.text]} {...props}>
      {children}
    </PaperText>
  );
};

const styles = {
  text: {
    fontFamily: 'NotoSans-Regular',
  },
};

export default Text;
