import {Dimensions, Platform, StatusBar} from 'react-native';

export const textStyle = (size, color, weight) => {
  const fontWeight = weight * 100;
  return {
    fontSize: wp(size),
    color: color,
    fontWeight: fontWeight + '',
  };
};

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let isIPhoneX = false;
const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  isIPhoneX =
    W_HEIGHT === 780 ||
    W_WIDTH === 780 ||
    W_HEIGHT === 812 ||
    W_WIDTH === 812 ||
    W_HEIGHT === 844 ||
    W_WIDTH === 844 ||
    W_HEIGHT === 896 ||
    W_WIDTH === 896 ||
    W_HEIGHT === 926 ||
    W_WIDTH === 926;
}

export const wp = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return (screenWidth * elemWidth) / 100;
};

export const hp = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return ((screenHeight - getStatusBarHeight().toFixed(0)) * elemHeight) / 100;
};

const getStatusBarHeight = () => {
  return Platform.select({
    ios: isIPhoneX ? 78 : 20,
    android: StatusBar.currentHeight > 24 ? 0 : StatusBar.currentHeight,
    default: 0,
  });
};
