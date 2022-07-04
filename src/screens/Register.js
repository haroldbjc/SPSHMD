import React from 'react';
import {StyleSheet, Image, useColorScheme, View, ScrollView, StatusBar} from 'react-native';
import {validationSchema} from '../utils/validationSchema';
import TextInput from '../components/TextInput';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-navigation';
import Button from '../components/Button';
import {signUp} from '../api/user';
import {NavigationActions} from 'react-navigation';
import {showMessage} from 'react-native-flash-message';
import {Text} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSignUp = async (values) => {
    let response = null;
    try {
      setIsLoading(true);
      response = await signUp(values);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.response.data?.message,
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
    if (response) {
      showMessage({
        message: 'Success',
        description: 'You have successfully registered.',
        type: 'success',
      });
      navigation.reset(
        [
          NavigationActions.navigate({
            routeName: 'AuthLogin',
          }),
        ],
        0,
      );
    } else {
      console.log('Error');
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" source={require('../assets/images/outline_radar_black_36dp.png')} />
        </View>
        <Text style={styles.title}>Smart Portable System for Heavy Metal Detection</Text>
        {/* Formik with validation */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSignUp(values);
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <View>
              <TextInput
                label={errors.username && touched.username ? errors.username : 'Username'}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                error={touched.username && errors.username}
              />
              <TextInput
                label={errors.email && touched.email ? errors.email : 'Email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
              />
              <TextInput
                label={errors.password && touched.password ? errors.password : 'Password'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                secureTextEntry
              />
              <TextInput
                label={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : 'Confirm Password'}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry
              />
              <Button title="Register" onPress={handleSubmit} loading={isLoading} icon="account-plus" />
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
