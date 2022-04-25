/**
 * Header Button Component
 */

import React from 'react';
import {View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

import theme from '../configs/theme';

const HeaderButton = ({color, iconName, iconSize, buttonStyle, onPress, disabled, badgeCount}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}
    >
      {iconName && (
        <IconButton icon={iconName} size={iconSize} onPress={onPress} disabled={disabled} style={buttonStyle} />
      )}
      {badgeCount > 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: theme.colors.danger,
            top: 9,
            right: 9,
            width: 18,
            height: 18,
            borderRadius: 9,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

HeaderButton.defaultProps = {
  color: theme.colors.primary,
  iconSize: 26,
  disabled: false,
  badgeCount: 0,
};

export default HeaderButton;
