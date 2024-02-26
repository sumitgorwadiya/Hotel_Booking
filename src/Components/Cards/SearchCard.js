import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Images} from '../../Constants/Images';
import {Colors} from '../../Constants/Colors';
import SolidButton from '../Buttons/SolidButton';
import SearchAddressModal from '../Modals/SearchAddressModal';
import TravelersModal from '../Modals/TravelersModal';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../Config/Stack/Screens';
import DatePickerModal from '../Modals/DatePickerModal';
import moment from 'moment';
import {StaticData} from '../../Constants/StaticData';

const SearchCard = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState();
  const [adults, setAdults] = useState();
  const [children, setChildren] = useState();
  const [userLocation, setUserLocation] = useState();
  const [travelersVisible, setTravelersVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [locationError, setLocationError] = useState();
  const [checkInError, setCheckInError] = useState();
  const [roomsError, setRoomsError] = useState();
  const checkIn = moment(checkInDate).format('DD/MM/YYYY');
  const checkOut = moment(checkOutDate).format('DD/MM/YYYY');

  useEffect(() => {
    if (locationError) {
      userLocation && setLocationError(false);
    }
  }, [locationError, userLocation]);

  useEffect(() => {
    if (checkInError) {
      checkInDate && checkOutDate && setCheckInError(false);
    }
  }, [checkInError, checkInDate, checkOutDate]);

  useEffect(() => {
    if (roomsError) {
      rooms && setRoomsError(false);
    }
  }, [roomsError, rooms]);

  const searchHandler = () => {
    if (!userLocation) {
      setLocationError(true);
    } else if (!checkInDate || !checkOutDate) {
      setCheckInError(true);
    } else if (!rooms) {
      setRoomsError(true);
    } else {
      const hotelsData = StaticData.filter(
        item => item.location === userLocation,
      );
      console.log('hotelsData', hotelsData);
      const travelerData = {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        checkInDateOnly: moment(checkInDate).format('DD/MM/YYYY'),
        checkOutDateOnly: moment(checkOutDate).format('DD/MM/YYYY'),
        children: children,
        rooms: rooms,
        adults: adults,
        userLocation: userLocation,
        hotelsData: hotelsData,
      };
      navigation.navigate(Screens.HotelsScreen, {travelerData: travelerData});
    }
  };

  const renderCard = ({
    imgSrc,
    text,
    onPress,
    filled,
    errorMsg,
    errorShown,
  }) => {
    return (
      <>
        <TouchableOpacity style={styles.cardCont} onPress={onPress}>
          <Image source={imgSrc} style={styles.location} />
          <Text style={filled ? styles.cardTextFilled : styles.cardText}>
            {text}
          </Text>
        </TouchableOpacity>
        {errorShown && <Text style={styles.errorText}>{errorMsg}</Text>}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard({
        imgSrc: Images.search,
        text: userLocation || 'Search anywhere',
        onPress: () => {
          setSearchModalVisible(true);
        },
        filled: userLocation,
        errorMsg: 'Please Select Location',
        errorShown: locationError,
      })}
      {renderCard({
        imgSrc: Images.calendar,
        text:
          checkIn && checkOut
            ? checkIn + ' - ' + checkOut
            : 'Check-In / Check-Out',
        onPress: () => {
          setDatePickerVisible(true);
        },
        errorMsg: 'Please Select Check-In/Check-Out Date',
        errorShown: checkInError,
        filled: checkInDate,
      })}
      {renderCard({
        imgSrc: Images.person,
        text: `${rooms || 1} Rooms, ${adults || 2} Adults, ${
          children || 0
        } kids`,
        onPress: () => {
          setTravelersVisible(true);
        },
        filled: rooms,
        errorMsg: 'Please Select Rooms And Guest Details',
        errorShown: roomsError,
      })}
      <SolidButton text={'Search'} onPress={searchHandler} />
      <SearchAddressModal
        visible={searchModalVisible}
        onPressCancel={() => {
          setSearchModalVisible(false);
        }}
        setUserLocation={setUserLocation}
      />
      <TravelersModal
        visible={travelersVisible}
        onPressCancel={() => {
          setTravelersVisible(false);
        }}
        setRooms={setRooms}
        setAdults={setAdults}
        setChildren={setChildren}
      />
      <DatePickerModal
        visible={datePickerVisible}
        onPressCancel={() => {
          setDatePickerVisible(false);
        }}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  cardCont: {
    backgroundColor: Colors.grayLight,
    paddingHorizontal: wp('4'),
    borderRadius: wp('7'),
    height: wp('14'),
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(3),
    paddingLeft: wp(8),
    marginBottom: wp(3),
  },
  cardText: {...textStyle(4.2, Colors.gray, 6)},
  cardTextFilled: {...textStyle(4.2, Colors.black, 6)},
  errorText: {
    ...textStyle(2.7, 'red', 5),
    textAlign: 'right',
    marginTop: wp(-2),
    marginBottom: wp(2),
  },
  location: {
    width: wp('4.2'),
    height: wp('4.2'),
    resizeMode: 'contain',
    tintColor: Colors.gray,
  },
});
