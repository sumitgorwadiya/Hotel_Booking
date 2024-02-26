import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';
import {hp, wp} from './MyStyle';

const showToast = message => {
  Toast.show({
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    type: 'success',
  });
};

const showError = message => {
  Toast.show({
    text1: message,
    position: 'top',
    visibilityTime: 3000,
    type: 'error',
    topOffset: hp(8),
  });
};

const Utility = {
  showToast,
  showError,
};

export default Utility;
