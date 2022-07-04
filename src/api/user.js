import {axiosInstance} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signUp = async (user) => {
  const response = await axiosInstance.post('/api/auth/signup', user);
  return response;
};

export const signIn = async (user) => {
  const response = await axiosInstance.post('/api/auth/signin', user);
  if (response.data.token) {
    await AsyncStorage.setItem('token', response.data.token);
  }
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

export const testApi = async () => {
  const response = await axiosInstance.get('/api');
  return response.data;
};
