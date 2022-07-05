import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {EditUserValidationSchema} from '../utils/validationSchema';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {editUser} from '../api/user';
import {showMessage} from 'react-native-flash-message';

const ProfileScreen = () => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getUser = async () => {
      const authuser = await AsyncStorage.getItem('user');
      setUser(JSON.parse(authuser));
    };
    getUser();
    setIsLoading(false);
  }, []);

  const handleEdit = async (values) => {
    let response;
    try {
      values = {...values, id: user.id};
      response = await editUser(values);
    } catch (error) {
      console.log(error.response);
      showMessage({
        message: 'Error',
        description: error.response.data,
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
      <View style={styles.header}>
        <Icon name="person" size={30} color={Colors.black} />
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <Formik
        initialValues={{
          username: user?.username,
          email: user?.email,
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          handleEdit(values);
        }}
        validationSchema={EditUserValidationSchema}
      >
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View>
            <TextInput
              label={errors.username && touched.username ? errors.username : 'Username'}
              value={values.username}
              onChangeText={handleChange('username')}
              error={touched.username && errors.username}
              placeholder="Enter a new username"
            />
            <TextInput
              label={errors.email && touched.email ? errors.email : 'Email'}
              value={values.email}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email}
              placeholder="Enter a new email"
            />
            <Button title={'Save'} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bodyText: {
    fontSize: 18,
    color: Colors.black,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfoText: {
    fontSize: 18,
    color: Colors.black,
  },
});

export default ProfileScreen;
