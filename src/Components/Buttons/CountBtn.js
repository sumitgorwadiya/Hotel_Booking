import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../Constants/Colors';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Images} from '../../Constants/Images';

const CountBtn = ({numberCount, setNumberCount}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          numberCount > 0 && setNumberCount(numberCount - 1);
        }}
        style={styles.iconCont}>
        <Image source={Images.minus} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.numberText}>{numberCount}</Text>
      <TouchableOpacity
        onPress={() => {
          setNumberCount(numberCount + 1);
        }}
        style={styles.iconCont}>
        <Image source={Images.plus} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default CountBtn;

const styles = StyleSheet.create({
  navigationText: {
    ...textStyle(3.8, Colors.orange, 5),
  },
  container: {
    width: wp('28'),
    borderWidth: wp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: wp(2),
    marginTop: wp(2),
    borderRadius: wp(3),
    borderColor: Colors.orange,
  },
  iconCont: {
    width: wp(8),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: wp(4.2),
    height: wp(4.2),
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
  numberText: {
    ...textStyle(5, Colors.orange, 7),
    width: wp(8),
    textAlign: 'center',
  },
});
