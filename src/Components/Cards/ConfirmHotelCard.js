import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {roomURL} from '../../Screens/HomeScreen';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {Images} from '../../Constants/Images';

const ConfirmHotelCard = ({hotelData, roomData}) => {
  console.log('roomData', roomData);
  return (
    <View style={styles.container}>
      <Image source={Images.room} style={styles.img} />
      <View style={styles.subCont}>
        <Text style={styles.title} numberOfLines={1}>
          {hotelData.name}
        </Text>
        <View style={styles.locationCont}>
          <Image source={Images.location} style={styles.locationImg} />
          <Text style={styles.locationText}>{hotelData.location}</Text>
        </View>
        <View style={styles.locationCont}>
          <Image source={Images.star} style={styles.starImg} />
          <Text style={styles.locationText}>{hotelData.rating}/10 Ratting</Text>
        </View>
        <Text style={styles.locationText}>1 Room, 2 Adults, 0 children</Text>
        <Text style={styles.locationText}>{roomData.room_type}</Text>
      </View>
    </View>
  );
};

export default ConfirmHotelCard;

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(2),
  },
  subCont: {
    width: wp(58),
    gap: wp(1.2),
  },
  title: {
    ...textStyle(5, Colors.black, 7),
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.6),
  },
  locationImg: {
    width: wp(3.2),
    height: wp(3.2),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  starImg: {
    width: wp(3.2),
    height: wp(3.2),
    resizeMode: 'contain',
  },
  locationText: {
    ...textStyle(3, Colors.black, 5),
  },
  adultText: {
    ...textStyle(3, Colors.gray, 5),
  },
});
