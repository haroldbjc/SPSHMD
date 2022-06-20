import React from 'react';
import {StatusBar, View, StyleSheet, Modal, Text} from 'react-native';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native-paper';

import theme from '../configs/theme';

const ProgressHUD = ({
  isVisible,
  overlayColor,
  backgroundColor,
  width,
  height,
  borderRadius,
  indicatorColor,
  indicatorSize,
  title,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => {
        return false;
      }}
    >
      <StatusBar backgroundColor={overlayColor} />
      <View style={[styles.overlay, {backgroundColor: overlayColor}]}>
        <View
          style={[
            styles.hud,
            {
              backgroundColor,
              width,
              height,
              borderRadius,
            },
          ]}
        >
          <ActivityIndicator color={theme.colors.primary} size={indicatorSize} animating={isVisible} />
        </View>
        {title && (
          <View>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

ProgressHUD.propTypes = {
  isVisible: PropTypes.bool,
  overlayColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  indicatorSize: PropTypes.string,
  indicatorColor: PropTypes.string,
  title: PropTypes.string,
};

ProgressHUD.defaultProps = {
  isVisible: false,
  overlayColor: theme.colors.backdrop,
  backgroundColor: 'white',
  width: 80,
  height: 80,
  borderRadius: 8,
  indicatorColor: theme.colors.primary,
};

const styles = StyleSheet.create({
  hud: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default ProgressHUD;
