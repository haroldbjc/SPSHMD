import AsyncStorage from '@react-native-async-storage/async-storage';

import {axiosInstance} from './utils';

export const signUp = async (user) => {
  const response = await axiosInstance.post('/api/auth/signup', user);
  return response;
};

export const signIn = async (user) => {
  const response = await axiosInstance.post('/api/auth/signin', user);
  if (response.data.token) {
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response?.data;
};

export const editUser = async (user) => {
  const response = await axiosInstance.post('/api/auth/edituser', user);
  if (response?.data.user) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response?.data;
};

export const changePassword = async (user) => {
  const response = await axiosInstance.post('/api/auth/editpassword', user);
  return response?.data;
};

export const logOut = () => {
  AsyncStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = AsyncStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};

// testing API calls
export const testApi = async () => {
  const response = await axiosInstance.get('/api');
  return response.data;
};
