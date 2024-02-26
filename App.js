import React, {useEffect, useState} from 'react';
import Route from './src/Config/Stack/Route';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/Screens/SplashScreen';
import {LogBox} from 'react-native';

const App = () => {
  const [splash, setSplash] = useState(true);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2400);
  }, []);

  return (
    <>
      {splash ? <SplashScreen /> : <Route />}
      <Toast />
    </>
  );
};

export default App;
