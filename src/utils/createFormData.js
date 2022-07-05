import {Platform} from 'react-native';

const createFormData = (photo) => {
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type || 'image/jpg',
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  return data;
};

export default createFormData;
