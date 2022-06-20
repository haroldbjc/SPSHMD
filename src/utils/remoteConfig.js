import {ENV} from '../constants/env';

export const REMOTE_CONFIG_KEY = {
  API_URL: 'api_url',
};

const DEFAULT_CONFIG = {
  [REMOTE_CONFIG_KEY.API_URL]: ENV.API_URL,
};
