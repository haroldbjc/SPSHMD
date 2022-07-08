import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';

import {EditUserValidationSchema} from '../utils/validationSchema';
import {editUser} from '../api/user';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import colors from '../constants/colors';

const EditProfile = ({navigation}) => {
  const [authUser, setAuthUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

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
      response = await editUser(values);
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
        description: 'You have successfully edited your profile.',
        type: 'success',
      });
    } else {
      console.log('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          username: authUser?.username,
          email: authUser?.email,
        }}
        enableReinitialize
        validationSchema={EditUserValidationSchema}
        onSubmit={(values) => {
          handleEdit(values);
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <View style={styles.form}>
            <TextInput
              label="Name"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username && errors.username}
            />
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
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

export default EditProfile;
