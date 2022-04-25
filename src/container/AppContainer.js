import React, {useRef} from 'react';
import {View, Platform, StyleSheet, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {createAppContainer} from 'react-navigation';

import AppNavigator from '../navigators/App';

const AppNavigationContainer = createAppContainer(AppNavigator);

const AppContainer = () => {
  const navigationRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <AppNavigationContainer ref={navigationRef} />
      <FlashMessage style={styles.message} />
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    elevation: 8,
    ...Platform.select({
      android: {
        paddingTop: Platform.OS === 'android' ? 8 + StatusBar.currentHeight : 0,
      },
    }),
  },
});

export default AppContainer;
