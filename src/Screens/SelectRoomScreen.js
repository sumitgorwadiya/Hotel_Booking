import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../Components/Headers/SubHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../Constants/Colors';
import {wp} from '../Constants/MyStyle';
import RoomCard from '../Components/Cards/RoomCard';
import CheckInCard from '../Components/Cards/CheckInCard';
import SolidButton from '../Components/Buttons/SolidButton';
import {Screens} from '../Config/Stack/Screens';
import moment from 'moment';
import DatePickerModal from '../Components/Modals/DatePickerModal';
import TravelersModal from '../Components/Modals/TravelersModal';
import Utility from '../Constants/Utility';

const SelectRoomScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const hotelData = route?.params?.hotelData;
  const [selectedIndex, setSelectedIndex] = useState();
  const travelerData = route?.params?.travelerData;
  const [rooms, setRooms] = useState();
  const [adults, setAdults] = useState();
  const [children, setChildren] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const checkIn = moment(checkInDate).format('DD/MM/YYYY');
  const checkOut = moment(checkOutDate).format('DD/MM/YYYY');
  const [travelersVisible, setTravelersVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [roomAvailability, setRoomAvailability] = useState(false);

  const startDate = moment(checkInDate);
  const endDate = moment(checkOutDate);
  const numberOfDays = endDate.diff(startDate, 'days') + 1;
  const datesArray = Array.from({length: numberOfDays}, (_, index) =>
    startDate.clone().add(index, 'days').format('DD-MM-YYYY'),
  );

  const bookDates = datesArray?.map(item => {
    return {
      bookedDate: item,
      numberOfRooms: rooms,
    };
  });

  useEffect(() => {
    if (travelerData?.rooms) {
      setRooms(travelerData?.rooms);
      setAdults(travelerData?.adults);
      setChildren(travelerData?.children);
    }
  }, [travelerData]);

  useEffect(() => {
    if (travelerData?.checkInDate) {
      setCheckInDate(travelerData?.checkInDate);
      setCheckOutDate(travelerData?.checkOutDate);
    }
  }, [travelerData]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.subContainer}>
        <SubHeader
          onPressBack={() => {
            navigation.goBack();
          }}
          text={hotelData.name}
        />
        <CheckInCard
          checkInOutDate={checkInDate ? `${checkIn} - ${checkOut}` : null}
          roomsDetails={
            rooms
              ? `${rooms} Rooms, ${adults} Adults, ${'\n'}${children} Kids`
              : null
          }
          onPressDatesEdit={() => {
            setDatePickerVisible(true);
            setSelectedIndex();
          }}
          onPressRoomEdit={() => {
            setTravelersVisible(true);
            setSelectedIndex();
          }}
          otherStyle={{marginTop: wp(-6), marginBottom: wp(4)}}
        />
        <FlatList
          data={hotelData?.rooms}
          renderItem={({item, index}) => {
            return (
              <RoomCard
                roomItem={item}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                bookDates={bookDates}
                setRoomAvailability={setRoomAvailability}
              />
            );
          }}
          contentContainerStyle={{marginTop: wp(2), paddingBottom: wp(24)}}
        />
        <View style={styles.bottomBar}>
          <SolidButton
            text={'Continue'}
            onPress={() => {
              if (!selectedIndex) {
                Utility.showError('Please select room for continue');
              } else {
                const travelerDataNew = {
                  ...travelerData,
                  checkInDate: checkInDate,
                  checkOutDate: checkOutDate,
                  checkInDateOnly: moment(checkInDate).format('DD/MM/YYYY'),
                  checkOutDateOnly: moment(checkOutDate).format('DD/MM/YYYY'),
                  children: children,
                  rooms: rooms,
                  adults: adults,
                };
                navigation.navigate(Screens.ConfirmScreen, {
                  hotelData: hotelData,
                  roomData: hotelData?.rooms[selectedIndex],
                  travelerData: travelerDataNew,
                });
              }
            }}
          />
        </View>
      </View>
      <TravelersModal
        visible={travelersVisible}
        onPressCancel={() => {
          setTravelersVisible(false);
        }}
        setRooms={setRooms}
        setAdults={setAdults}
        setChildren={setChildren}
        rooms={rooms}
        adults={adults}
        children={children}
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

export default SelectRoomScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  subContainer: {flex: 1, backgroundColor: Colors.white, paddingTop: wp(10)},
  bottomBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    height: wp(20),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(4),
  },
});
