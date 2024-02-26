import React, {useEffect, useState} from 'react';
import Route from './src/Config/Stack/Route';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/Screens/SplashScreen';
import {LogBox} from 'react-native';
import {store} from './src/Config/Redux/Store';
import {Provider} from 'react-redux';

const App = () => {
  const [splash, setSplash] = useState(true);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2400);
  }, []);

  return (
    <Provider store={store}>
      {splash ? <SplashScreen /> : <Route />}
      <Toast />
    </Provider>
  );
};

export default App;
