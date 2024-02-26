import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAsData = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getAsData = (key, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      resolve(JSON.parse(value));
    } catch (e) {
      reject(e);
    }
  });
};
