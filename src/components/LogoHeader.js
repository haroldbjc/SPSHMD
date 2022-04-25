import React from 'react';
import {View, Image} from 'react-native';
import {withNavigation} from 'react-navigation';

const LogoHeader = () => {
  return (
    <View>
      <Image resizeMode="center" source={require('../assets/images/outline_radar_black_36dp.png')} />
    </View>
  );
};

export default withNavigation(LogoHeader);
