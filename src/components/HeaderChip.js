import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../constants/colors';
import theme from '../configs/theme';

import Text from './Text';

const HeaderChip = ({icon = 'account-circle', mainText, altText}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.profileIcon}>
          <Icon name={icon} size={30} color={colors.ACCENT} />
        </View>
        <View style={styles.headerContentRight}>
          {mainText && (
            <Text variant="h2" style={styles.headerContentRightText}>
              {mainText}
            </Text>
          )}
          {altText && <Text style={styles.headerContentRightText}>{altText}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.ACCENT,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileIcon: {
    backgroundColor: theme.colors.background,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContentRight: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContentRightText: {
    color: 'white',
  },
});

export default HeaderChip;
