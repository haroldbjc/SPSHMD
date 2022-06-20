import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, useColorScheme, View} from 'react-native';
import {Formik} from 'formik';
import ProgressHUD from '../components/ProgressHUD';
import {showMessage} from 'react-native-flash-message';
import {addRecord} from '../api';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';

const initialValues = {
  name: '',
  position: '',
  level: '',
};

const HomeScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const handleSubmission = async (values) => {
    try {
      setIsLoading(true);
      const response = await addRecord(values);
      console.log(response);
    } catch (error) {
      showMessage({
        message: 'Error',
        description: "Check your internet connection and try again. Make sure you're connected to the USMSecure.",
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ProgressHUD isVisible />;
  }

  return (
    <Formik
      initialValues={{initialValues}}
      onSubmit={(values) => {
        handleSubmission(values);
      }}
    >
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
              <TextInput
                style={styles.textInput}
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                label="Position"
                value={values.position}
                onChangeText={handleChange('position')}
                onBlur={handleBlur('position')}
                autoCorrect={false}
              />
              <TextInput
                style={styles.textInput}
                label="Level"
                value={values.level}
                onChangeText={handleChange('level')}
                onBlur={handleBlur('level')}
                autoCorrect={false}
              />
              <View style={styles.buttonContainer}>
                <Icon.Button
                  name="send"
                  backgroundColor={isDarkMode ? Colors.white : Colors.black}
                  onPress={handleSubmit}
                  color={isDarkMode ? Colors.black : Colors.white}
                >
                  Login
                </Icon.Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    marginVertical: 6,
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
});

export default HomeScreen;
