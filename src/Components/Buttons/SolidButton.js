import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../Constants/Colors';
import {textStyle, wp} from '../../Constants/MyStyle';

const SolidButton = ({text, otherStyle, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, otherStyle]} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SolidButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    height: wp('14'),
    borderRadius: wp(7),
    width: wp(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(4),
  },
  btnText: {
    ...textStyle(5, Colors.white, 6),
  },
});
