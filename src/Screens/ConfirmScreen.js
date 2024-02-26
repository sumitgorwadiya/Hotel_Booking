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
import {Screens} from '../Config/Stack/Screens';
import moment from 'moment';
import Utility from '../Constants/Utility';
import {StaticData} from '../Constants/StaticData';

const ConfirmScreen = () => {
  const route = useRoute();
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
      // Alert.alert('Congratulations!', 'Hotel Booked Successfuly', [
      //   {
      //     text: 'Okay',
      //     onPress: () => {
      //       navigation.reset({
      //         routes: [{name: Screens.HomeScreen}], // Array of route objects representing the new state
      //       });
      //     },
      //   },
      // ]);
    }
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
            <ConfirmHotelCard hotelData={hotelData} roomData={roomData} />
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
