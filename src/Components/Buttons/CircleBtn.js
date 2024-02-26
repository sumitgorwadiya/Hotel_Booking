import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const CircleBtn = ({isActive, onPress, text}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.circleCont}>
        {isActive && <View style={styles.dot} />}
      </TouchableOpacity>
      <Text style={styles.name}>{text}</Text>
    </View>
  );
};

export default CircleBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.2),
  },
  circleCont: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: wp(0.7),
    borderColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: wp(2.4),
    height: wp(2.4),
    borderRadius: wp(1.5),
    backgroundColor: Colors.orange,
  },
  name: {
    ...textStyle(3.7, Colors.black, 4),
  },
});
