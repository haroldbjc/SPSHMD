import React, {useEffect} from 'react';
import {StyleSheet, Image, useColorScheme, View, ScrollView, StatusBar} from 'react-native';
import TextInput from '../components/TextInput';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {validationSchema} from '../utils/validationSchema';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-navigation';
import Button from '../components/Button';
import {signIn, signUp} from '../api/user';
import {NavigationActions} from 'react-navigation';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressHUD from '../components/ProgressHUD';
import theme from '../configs/theme';
import {Text} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(true);

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
      console.log(await AsyncStorage.getItem('token'));
      navigation.reset(
        [
          NavigationActions.navigate({
            routeName: 'MainHome',
          }),
        ],
        0,
      );
    }
  };

  const handleSignUp = async (values) => {
    let response;
    try {
      setIsLoading(true);
      response = await signUp(values);
      console.log(response);
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error',
        description: "Check your internet connection and try again. Make sure you're connected to the USMSecure.",
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
    if (response.status === 200) {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    // Wait 1 second before checking if user is logged in
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.reset(
          [
            NavigationActions.navigate({
              routeName: 'MainHome',
            }),
          ],
          0,
        );
      } else {
        setAuthUser(false);
      }
    }, 1000);
  }, [navigation]);

  if (authUser) {
    return <ProgressHUD isVisible title={'Initializing... '} overlayColor={'white'} />;
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
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
              {/* <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCorrect={false}
              /> */}
              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCorrect={false}
                secureTextEntry={true}
              />
              <Button title={'Login'} onPress={handleSubmit} loading={isLoading} icon="login" />
              <Button title={'Register'} loading={isLoading} icon="account-plus" />
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
