import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../Constants/Images';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Guest</Text>
      <Image source={Images.bell} style={styles.bell} />
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
    resizeMode: 'cover',
    borderRadius: wp('6'),
    tintColor: Colors.orange,
    position: 'absolute',
    right: wp('5'),
  },
  headerText: {
    ...textStyle(6.8, Colors.orange, 6),
  },
});
