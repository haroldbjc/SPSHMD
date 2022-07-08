import Axios from 'axios';

import {ENV} from '../constants/env';

export const axiosInstance = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  baseURL: ENV.API_URL,
});
