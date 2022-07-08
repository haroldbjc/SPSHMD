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

export const metalDetection = async (image) => {
  const response = await axiosInstance.post('/image/metalDetection', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// post results to the server
export const postResults = async (results) => {
  const response = await axiosInstance.post('/image/result', results);
  return response.data;
};

// get locations from the server
export const getLocations = async () => {
  const response = await axiosInstance.get('/image/locations');
  return response?.data;
};

// delete location from the server
export const deleteLocation = async (id) => {
  const response = await axiosInstance.delete(`/image/location/${id}`);
  return response.data;
};
