import React from 'react';
import {StyleSheet, Image, View, ScrollView, StatusBar} from 'react-native';
import {Formik} from 'formik';
import {SafeAreaView, StackActions} from 'react-navigation';
import {NavigationActions} from 'react-navigation';
import {showMessage} from 'react-native-flash-message';

import Button from '../components/Button';
import {signIn} from '../api/user';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import Text from '../components/Text';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmission = async (values) => {
    let response;
    try {
      setIsLoading(true);
      response = await signIn(values);
    } catch (error) {
      console.log(response);
      showMessage({
        message: 'Error',
        description: error.response.data?.error,
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
    if (response) {
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'MainHome'})],
        }),
      );
    }
  };

  // route to register screen
  const handleRegister = () => {
    navigation.push('AuthRegister');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" source={require('../assets/images/outline_radar_black_36dp.png')} />
        </View>
        <Text style={styles.title}>Smart Portable System for Heavy Metal Detection</Text>
        <Formik
          //validationSchema={validationSchema}
          initialValues={{initialValues}}
          onSubmit={(values) => {
            handleSubmission(values);
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                autoCorrect={false}
              />
              <PasswordInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCorrect={false}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                onPress={() => setShowPassword(!showPassword)}
              />
              <Button title={'Login'} onPress={handleSubmit} loading={isLoading} icon="login" style={styles.button} />
              <Button title={'Register'} onPress={handleRegister} icon="account-plus" style={styles.button} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
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
  title: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export default LoginScreen;
