import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';

import Text from './Text';

const EmptyView = ({icon = 'hourglass-empty', title = 'Nothing in here :('}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={icon} size={50} color={colors.ACCENT} />
      </View>
      <Text variant={'h4'}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.8,
  },
  icon: {
    marginBottom: 20,
  },
});

export default EmptyView;
