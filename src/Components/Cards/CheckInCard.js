import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const CheckInCard = ({
  checkInOutDate,
  roomsDetails,
  otherStyle,
  onPressRoomEdit,
  onPressDatesEdit,
}) => {
  return (
    <View style={[styles.container, otherStyle]}>
      <View>
        <Text style={[styles.title2]}>Check-in / Check-out</Text>
        <View style={styles.checkCont}>
          <Text style={styles.checkTime}>
            {checkInOutDate || 'Select Dates'}
          </Text>
          <TouchableOpacity onPress={onPressDatesEdit} style={styles.editCont}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={[styles.title2]}>Rooms and Guests</Text>
        <View style={styles.checkCont}>
          <Text style={styles.checkTime}>{roomsDetails || 'Select Rooms'}</Text>
          <TouchableOpacity onPress={onPressRoomEdit} style={styles.editCont}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckInCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90'),
    alignSelf: 'center',
  },
  title2: {
    ...textStyle(3.2, Colors.black, 7),
    marginTop: wp(6),
    marginBottom: wp(2),
  },
  checkCont: {
    width: wp(42),
    height: wp(14),
    backgroundColor: Colors.white,
    elevation: 6,
    marginTop: wp(0),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  checkTime: {
    ...textStyle(2.7, Colors.black, 4),
    width: wp(26),
  },
  editText: {
    ...textStyle(3.2, Colors.white, 5),
  },
  editCont: {
    backgroundColor: Colors.orange,
    paddingVertical: wp(1),
    paddingHorizontal: wp(3),
    borderRadius: wp(3),
  },
});
