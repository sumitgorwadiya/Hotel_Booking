import {Alert, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../Constants/Colors';
import SubHeader from '../Components/Headers/SubHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {wp} from '../Constants/MyStyle';
import ConfirmHotelCard from '../Components/Cards/ConfirmHotelCard';
import ConfirmDateCard from '../Components/Cards/ConfirmDateCard';
import ConfirmPriceCard from '../Components/Cards/ConfirmPriceCard';
import TravelerCard from '../Components/Cards/TravelerCard';
import SolidButton from '../Components/Buttons/SolidButton';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {storeAllHotelData} from '../Config/Redux/Slices/HotelInfoSlice';
import {storeAsData} from '../Constants/StoreFunctions';
import {AsKey} from '../Constants/AsKey';
import Utility from '../Constants/Utility';
import {Screens} from '../Config/Stack/Screens';

const ConfirmScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hotelData = route?.params?.hotelData;
  const roomData = route?.params?.roomData;
  const travelerData = route?.params?.travelerData;
  const checkIn = moment(travelerData?.checkInDate);
  const checkOut = moment(travelerData?.checkOutDate);
  const differenceInDays = checkOut?.diff(checkIn, 'days');
  const [paidPrice, setPaidPrice] = useState(0);
  const [gender, setGender] = useState('Mr.');
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [code, setCode] = useState('+91');
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const {allHotelData} = useSelector(state => state.hotelInfo);

  console.log('differenceInDays', differenceInDays);

  const confirmHandler = () => {
    const isValidEmail = emailId => {
      // Regular expression pattern for validating email addresses
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(emailId);
    };
    const validEmail = isValidEmail(email);
    if (!firstName) {
      Utility.showError('Please Enter First Name');
    } else if (!lastName) {
      Utility.showError('Please Enter Last Name');
    } else if (!phoneNumber) {
      Utility.showError('Please Enter Phone Number');
    } else if (!email) {
      Utility.showError('Please Enter Email Id');
    } else if (!validEmail) {
      Utility.showError('Please Enter Correct Email Id');
    } else {
      storeHotelData();
    }
  };

  const storeHotelData = () => {
    const startDate = moment(travelerData?.checkInDate);
    const endDate = moment(travelerData?.checkOutDate);
    const numberOfDays = endDate.diff(startDate, 'days') + 1;
    const datesArray = Array.from({length: numberOfDays}, (_, index) =>
      startDate.clone().add(index, 'days').format('DD-MM-YYYY'),
    );
    const bookDates = datesArray?.map(item => {
      return {
        bookedDate: item,
        numberOfRooms: travelerData?.rooms,
      };
    });
    let finalArr = [];
    let m = allHotelData?.map((item, index) => {
      if (item?.hotelId === hotelData?.hotelId) {
        let newItem = Object.assign({});
        const roomTempData = item?.rooms?.map((itm, ind) => {
          let newItm = Object.assign({});
          if (itm?.room_id === roomData?.room_id) {
            if (itm?.bookingDates) {
              const combinedArray = [...itm?.bookingDates, ...bookDates];
              const numberOfRoomsByDate = {};
              for (const booking of combinedArray) {
                const {bookedDate, numberOfRooms} = booking;
                if (numberOfRoomsByDate[bookedDate]) {
                  numberOfRoomsByDate[bookedDate] += numberOfRooms;
                } else {
                  numberOfRoomsByDate[bookedDate] = numberOfRooms;
                }
              }
              const resultArray = Object.entries(numberOfRoomsByDate).map(
                ([bookedDate, numberOfRooms]) => ({bookedDate, numberOfRooms}),
              );

              console.log('numberOfRoomsByDate', resultArray);
              newItm = {...itm, bookingDates: resultArray};
            } else {
              newItm = {...itm, bookingDates: bookDates};
            }
          } else {
            newItm = itm;
          }
          return newItm;
        });
        newItem = {...item, rooms: roomTempData};
        finalArr.push(newItem);
      } else {
        finalArr.push(item);
      }
    });
    storeAsData(AsKey.hotelData, finalArr);
    dispatch(storeAllHotelData(finalArr));
    Alert.alert('Congratulations!', 'Hotel Booked Successfully', [
      {
        text: 'Okay',
        onPress: () => {
          navigation.reset({
            routes: [{name: Screens.HomeScreen}], // Array of route objects representing the new state
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.subContainer}>
        <SubHeader
          onPressBack={() => {
            navigation.goBack();
          }}
          text={'Confirm Booking'}
        />
        <ScrollView>
          <View style={styles.whiteBg}>
            <ConfirmHotelCard
              hotelData={hotelData}
              roomData={roomData}
              travelerData={travelerData}
            />
            <ConfirmDateCard
              checkInDate={travelerData?.checkInDateOnly}
              checkOutDate={travelerData?.checkOutDateOnly}
              differenceInDays={differenceInDays}
            />
          </View>
          <View style={styles.whiteBg}>
            <ConfirmPriceCard
              roomData={roomData}
              differenceInDays={differenceInDays}
              setPaidPrice={setPaidPrice}
            />
          </View>
          <View style={styles.whiteBg}>
            <TravelerCard
              gender={gender}
              firstName={firstName}
              lastName={lastName}
              code={code}
              email={email}
              setGender={setGender}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setCode={setCode}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          </View>
          <View style={{height: wp(24)}} />
        </ScrollView>
      </View>
      <View style={styles.bottomBar}>
        <SolidButton text={'Confirm'} onPress={confirmHandler} />
      </View>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  subContainer: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    paddingTop: wp(10),
  },
  whiteBg: {
    backgroundColor: Colors.white,
    paddingVertical: wp(2),
    marginTop: wp(2),
  },
  bottomBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    height: wp(20),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(4),
    elevation: 10,
  },
});
