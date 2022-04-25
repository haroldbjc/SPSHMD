import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={[backgroundStyle, styles.sectionContainer]}>
      <Icon name="home-repair-service" size={100} color={isDarkMode ? Colors.white : Colors.black} />
      <Text style={[styles.sectionTitle, {color: isDarkMode ? Colors.white : Colors.black}]}>Maintainance</Text>
      <Text style={[styles.sectionDescription, {color: isDarkMode ? Colors.light : Colors.dark}]}>
        Page will be up soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
  },
  sectionDescription: {
    marginTop: 8,
  },
});

export default HomeScreen;
