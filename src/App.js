/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import AppContainer from './container/AppContainer';

const App = () => {
  return (
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  );
};

export default App;
