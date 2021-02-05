import React from 'react';
import {SafeAreaView} from 'react-native';
import Camera from './src/components/Camera';
import ThingViewer from './src/components/ThingViewer';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ThingViewer />
    </SafeAreaView>
  );
};

export default App;
