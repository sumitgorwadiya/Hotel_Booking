import {Text, View} from 'react-native';
import React from 'react';
import {StaticData} from './src/Constants/StaticData';
import HomeScreen from './src/Screens/HomeScreen';

const App = () => {
  console.log('StaticData', StaticData?.length);

  return <HomeScreen />;
};

export default App;
