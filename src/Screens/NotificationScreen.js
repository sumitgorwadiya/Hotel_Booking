import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Constants/Colors';
import SubHeader from '../Components/Headers/SubHeader';
import {textStyle, wp} from '../Constants/MyStyle';
import {useNavigation} from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SubHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        text={'Notifications'}
      />
      <Text style={styles.noData}>No notification available</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  noData: {
    textAlign: 'center',
    ...textStyle(3.8, Colors.gray, 4),
    marginTop: wp('24'),
  },
});
