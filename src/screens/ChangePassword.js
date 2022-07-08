import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import {NavigationActions, StackActions} from 'react-navigation';

import {PasswordValidationSchema} from '../utils/validationSchema';
import {changePassword} from '../api/user';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import colors from '../constants/colors';

const ChangePassword = ({navigation}) => {
  const [authUser, setAuthUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    const getUser = async () => {
      const authuser = await AsyncStorage.getItem('user');
      setAuthUser(JSON.parse(authuser));
    };
    getUser();
    setIsLoading(false);
  }, []);

  const handleEdit = async (values) => {
    let response;
    try {
      values = {...values, id: authUser.id};
      response = await changePassword(values);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: error.response.data.message,
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
    if (response) {
      showMessage({
        message: 'Success',
        description: 'You have successfully changed your password.',
        type: 'success',
      });
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'AuthMain'})],
        }),
      );
    } else {
      console.log('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        enableReinitialize
        validationSchema={PasswordValidationSchema}
        onSubmit={(values) => {
          handleEdit(values);
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View style={styles.form}>
            <PasswordInput
              label="Current Password"
              value={values.currentPassword}
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              error={touched.currentPassword && errors.currentPassword}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              onPress={() => setShowPassword(!showPassword)}
            />
            <PasswordInput
              label="New Password"
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              error={touched.newPassword && errors.newPassword}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              onPress={() => setShowPassword(!showPassword)}
            />
            <PasswordInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              onPress={() => setShowPassword(!showPassword)}
            />
            <Button
              loading={isLoading}
              title="Save"
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={styles.buttonText}
              icon="login"
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: colors.SUCCESS,
  },
  buttonText: {
    color: 'white',
  },
});

export default ChangePassword;
