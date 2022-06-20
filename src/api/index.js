import {axiosInstance} from './utils';

/**
 * Extract v2 API error message
 * @param {AxiosError} error
 */
export const extractErrorMessage = (error) => error.response.data;

export const addRecord = async (record) => {
  const response = await axiosInstance.post('/record/add', record);
  return response.data;
};

export const uploadImage = async (image) => {
  const response = await axiosInstance.post('/image/upload', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
