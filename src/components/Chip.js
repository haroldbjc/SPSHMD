import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chip = ({label, value, icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={icon} size={20} color="#6B7FD7" />
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#6B7FD7',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'NotoSans-Regular',
  },
  icon: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    width: 30,
    height: 30,
  },
});

export default Chip;
