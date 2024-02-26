import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {roomURL} from '../../Screens/HomeScreen';
import {Images} from '../../Constants/Images';

const RoomCard = ({item, index, selectedIndex, setSelectedIndex}) => {
  const isActive = index === selectedIndex;
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedIndex(index);
      }}
      activeOpacity={0.84}
      style={styles.container}>
      <Image source={Images.room} style={styles.roomImg} />
      <View style={styles.detailCont}>
        <View style={styles.subCont}>
          <Text style={styles.title} numberOfLines={1}>
            {item.room_type}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {item.price_per_night}/n{' '}
            <Text style={styles.adultText} numberOfLines={1}>
              (1 night, 2 adults)
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(index);
          }}
          style={{
            backgroundColor: isActive ? Colors.orange : Colors.orange,
            ...styles.btn,
          }}>
          <Text style={isActive ? styles.selectedText : styles.selectText}>
            {isActive ? 'Selected' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    height: wp('64'),
    alignSelf: 'center',
    borderRadius: wp('4'),
    marginBottom: wp(6),
    elevation: 6,
  },
  roomImg: {
    width: wp('90'),
    height: wp('64'),
    alignSelf: 'center',
    borderRadius: wp('4'),
  },
  detailCont: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: wp('90'),
    backgroundColor: Colors.white3,
    borderBottomLeftRadius: wp('4'),
    borderBottomRightRadius: wp('4'),
    justifyContent: 'space-between',
  },
  title: {
    ...textStyle(4, Colors.black, 7),
  },
  price: {
    ...textStyle(4.8, Colors.orange, 7),
  },
  selectText: {
    ...textStyle(3.6, Colors.white, 7),
  },
  selectedText: {
    ...textStyle(3.6, Colors.gray, 7),
  },
  subCont: {
    width: wp(54),
  },
  adultText: {
    ...textStyle(2.8, Colors.gray, 5),
  },
  btn: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    borderRadius: wp(3),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
