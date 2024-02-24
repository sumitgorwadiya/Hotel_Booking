import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../Constants/Images';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const SubHeader = ({onPressBack, text}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backCont} onPress={onPressBack}>
        <Image source={Images.back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: wp('5'),
  },
  backIcon: {
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
  backCont: {
    position: 'absolute',
    left: wp('3'),
    width: wp('12'),
    height: wp('12'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...textStyle(5.6, Colors.orange, 5),
  },
});
