import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';

import Text from './Text';

const HistoryChip = ({color, metal, location = 'Location ignored', date = 'Not available', onPress}) => {
  // set background color for chip based on marker metal
  const chipMetalColor = StyleSheet.create({
    chipBackground: {
      backgroundColor: color,
    },
  });
  return (
    <TouchableRipple onPress={() => onPress()} style={[styles.chip, chipMetalColor.chipBackground]}>
      <View>
        {/* <Text variant={'h4'} style={styles.chipText}>
          Metal Detected: {metal}
        </Text>
        <Text variant={'h4'} style={styles.chipText}>
          Location: {location}
        </Text> */}
        <View style={styles.chipContent}>
          <View style={styles.icon}>
            <Icon
              name={metal === 'No metal detected' ? 'block' : 'compass-calibration'}
              size={20}
              color={colors.ACCENT}
            />
          </View>
          <Text variant={'h4'} style={styles.chipText}>
            {metal}
          </Text>
        </View>
        <View style={styles.chipContent}>
          <View style={styles.icon}>
            <Icon name="location-pin" size={20} color={colors.ACCENT} />
          </View>
          <Text variant={'h4'} style={styles.chipText}>
            Location: {location}
          </Text>
        </View>
        <View style={styles.chipContent}>
          <View style={styles.icon}>
            <Icon name="date-range" size={20} color={colors.ACCENT} />
          </View>
          <Text variant={'h4'} style={styles.chipText}>
            Time: {date}
          </Text>
        </View>
        <View style={styles.nextIcon}>
          <Icon name="delete" size={20} color={colors.DANGER} />
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.CONTAINER,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    width: '100%',
  },
  chipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
    backgroundColor: colors.CONTAINER,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    float: 'right',
    position: 'absolute',
    right: 5,
    top: '35%',
    marginRight: 10,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryChip;
