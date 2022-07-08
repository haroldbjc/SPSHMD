import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

import Button from '../components/Button';
import colors from '../constants/colors';
import HeaderChip from '../components/HeaderChip';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const getUser = async () => {
      const authuser = await AsyncStorage.getItem('user');
      setUser(JSON.parse(authuser));
    };
    getUser();
  }, []);

  // logout user and remove token from AsyncStorage
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AuthMain'})],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* profile header */}
      <HeaderChip mainText={user?.username} altText={user?.email} />
      {/* profile body */}
      <View style={styles.body}>
        <Button
          title={'Edit Profile'}
          onPress={() => navigation.push('ProfileEdit')}
          style={styles.button}
          icon="account-edit"
        />
        <Button
          title={'Change Password'}
          style={styles.button}
          icon="form-textbox-password"
          onPress={() => navigation.push('ProfileChangePassword')}
        />
        <Button
          title={'Logout'}
          onPress={() => handleLogout()}
          style={styles.logOutButton}
          labelStyle={styles.logOutButtonLabel}
          icon="logout"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  body: {
    flex: 1,
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
  logOutButton: {
    backgroundColor: colors.DANGER,
    width: '100%',
    marginBottom: 10,
  },
  logOutButtonLabel: {
    color: 'white',
  },
});

export default ProfileScreen;
