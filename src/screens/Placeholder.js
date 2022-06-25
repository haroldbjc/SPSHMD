import React from 'react';
import {StyleSheet, Text, StatusBar, View, SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Placeholder = () => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View style={[backgroundStyle, styles.sectionContainer]}>
        <Icon name="home-repair-service" size={100} color={Colors.black} />
        <Text style={[styles.sectionTitle, {color: Colors.black}]}>Maintainance</Text>
        <Text style={[styles.sectionDescription, {color: Colors.dark}]}>Page will be up soon</Text>
      </View>
    </SafeAreaView>
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

export default Placeholder;
