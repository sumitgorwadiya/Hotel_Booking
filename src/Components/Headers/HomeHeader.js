import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../Constants/Images';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../Config/Stack/Screens';

const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Guest</Text>
      <TouchableOpacity
        style={styles.bellCont}
        onPress={() => {
          navigation.navigate(Screens.NotificationScreen);
        }}>
        <Image source={Images.bell} style={styles.bell} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    padding: wp('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: {
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
  bellCont: {
    position: 'absolute',
    right: wp('3'),
    width: wp('12'),
    height: wp('12'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...textStyle(6.8, Colors.orange, 6),
  },
});
