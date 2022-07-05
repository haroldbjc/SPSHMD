import React from 'react';
import {StatusBar, View, StyleSheet, Modal, Text} from 'react-native';
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
