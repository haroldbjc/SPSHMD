import React from 'react';
import {Text as PaperText} from 'react-native-paper';

const Text = ({variant, children, style, ...props}) => {
  // variant for text style
  const textVariant = {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'black',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    h4: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    h5: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'black',
    },
    h6: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },
    p: {
      fontSize: 12,
      fontWeight: 'normal',
      color: 'black',
    },
  };

  const textStyle = {
    ...textVariant[variant],
  };

  return (
    <PaperText style={[textStyle, styles.text, style]} {...props}>
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
