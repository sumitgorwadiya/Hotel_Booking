import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {Images} from '../../Constants/Images';
import {roomURL} from '../../Screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../Config/Stack/Screens';

const HotelCard = ({item, travelerData}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const travelerDataNew = {...travelerData, selectedHotelData: item};
        navigation.navigate(Screens.HotelDetailScreen, {
          travelerData: travelerDataNew,
        });
      }}>
      <Image source={Images.room} style={styles.hotelImg} />
      <DetailCard item={item} />
    </TouchableOpacity>
  );
};

export default HotelCard;

export const DetailCard = ({item, isHotelDetail}) => {
  return (
    <View style={isHotelDetail ? styles.detailCont1 : styles.detailCont}>
      <View style={isHotelDetail ? styles.subCont1 : styles.subCont}>
        <Text
          style={isHotelDetail ? styles.titleBig : styles.title}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.locationCont}>
          <Image source={Images.location} style={styles.locationImg} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.locationCont}>
          <Image source={Images.star} style={styles.starImg} />
          <Text style={styles.locationText}>{item.rating}/10 Ratting</Text>
        </View>
      </View>
      <View style={{gap: isHotelDetail ? wp(1) : wp(0.5)}}>
        <Text style={styles.price} numberOfLines={1}>
          {item.price_per_night}/n
        </Text>
        <Text style={styles.adultText} numberOfLines={1}>
          (1 night, 2 adults)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    height: wp('72'),
    alignSelf: 'center',
    borderRadius: wp('4'),
    marginBottom: wp(6),
    elevation: 6,
  },
  hotelImg: {
    width: wp('90'),
    height: wp('72'),
    alignSelf: 'center',
    borderRadius: wp('4'),
  },
  detailCont: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
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
  detailCont1: {
    paddingVertical: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90'),
    justifyContent: 'space-between',
  },
  title: {
    ...textStyle(4.2, Colors.black, 7),
  },
  titleBig: {
    ...textStyle(4.8, Colors.black, 7),
  },
  price: {
    ...textStyle(6.4, Colors.orange, 7),
  },
  subCont: {
    width: wp(54),
    gap: wp(1),
  },
  subCont1: {
    width: wp(54),
    gap: wp(1.6),
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
