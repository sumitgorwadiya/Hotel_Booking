import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {Images} from '../../Constants/Images';
import Utility from '../../Constants/Utility';

const RoomCard = ({
  roomItem,
  index,
  selectedIndex,
  setSelectedIndex,
  bookDates,
}) => {
  const isActive = index == selectedIndex;
  const [errMessage, setErrMessage] = useState('');
  const [unAvailDateArr, setUnAvailDateArr] = useState([]);

  useEffect(() => {
    let unAvailDArr = [];

    let l = bookDates?.map((itm, ind) => {
      if (itm?.numberOfRooms > roomItem?.available_rooms) {
        setErrMessage(
          `Hotel has only ${roomItem?.available_rooms} ${roomItem?.room_type} capacity`,
        );
        unAvailDArr = ['cdc'];
        setUnAvailDateArr(unAvailDArr);
      } else {
        setErrMessage();
        if (roomItem?.bookingDates) {
          let k = roomItem?.bookingDates?.map((mItem, mindex) => {
            if (mItem?.bookedDate === itm?.bookedDate) {
              console.log('first', mItem?.bookedDate);
              let totalDays = mItem?.numberOfRooms + itm?.numberOfRooms;
              console.log('totalDays', totalDays);
              console.log('mItem?.available_rooms', roomItem?.available_rooms);
              if (totalDays > roomItem?.available_rooms) {
                console.log('push');
                unAvailDArr.push({
                  unAvailDate: mItem?.bookedDate,
                  remainingRoom:
                    roomItem?.available_rooms - mItem?.numberOfRooms,
                });
              }
            }
          });
        }
      }
    });

    setUnAvailDateArr(unAvailDArr);
  }, [bookDates, roomItem, selectedIndex]);

  const selectRoomHandler = () => {
    errMessage
      ? Utility.showError(errMessage)
      : unAvailDateArr?.length === 0
      ? setSelectedIndex(index + '')
      : Utility.showError('Rooms are not available in your dates');
  };

  console.log('errMessage', errMessage);

  return (
    <View>
      <TouchableOpacity
        onPress={selectRoomHandler}
        activeOpacity={0.84}
        style={styles.container}>
        <Image source={Images.room} style={styles.roomImg} />
        <View style={styles.detailCont}>
          <View style={styles.subCont}>
            <Text style={styles.title} numberOfLines={1}>
              {roomItem.room_type}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              {roomItem.price_per_night}/n{' '}
              <Text style={styles.adultText} numberOfLines={1}>
                (1 night, 2 adults)
              </Text>
            </Text>
            <Text style={styles.adultText} numberOfLines={1}>
              Total Rooms: {roomItem?.available_rooms}
            </Text>
          </View>
          <TouchableOpacity
            onPress={selectRoomHandler}
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
      {unAvailDateArr?.length > 0 && (
        <View style={styles.unAvailCont}>
          {unAvailDateArr?.map((item, index) => {
            return (
              <Text style={styles.errorText}>
                {errMessage
                  ? errMessage
                  : item?.remainingRoom === 0
                  ? `No Rooms available on ${item?.unAvailDate}`
                  : item?.remainingRoom === 1
                  ? `Only ${item.remainingRoom} room available on ${item?.unAvailDate}`
                  : `Only ${item.remainingRoom} rooms available on ${item?.unAvailDate}`}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    height: wp('66'),
    alignSelf: 'center',
    borderRadius: wp('4'),
    marginBottom: wp(6),
    elevation: 6,
  },
  roomImg: {
    width: wp('90'),
    height: wp('66'),
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
  errorText: {
    ...textStyle(2.7, 'red', 4),
    textAlign: 'center',
    marginTop: wp(0.7),
  },
  btn: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    borderRadius: wp(3),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unAvailCont: {
    backgroundColor: Colors.grayLight,
    marginBottom: wp(6),
    marginTop: -wp(7),
    width: wp(90),
    alignSelf: 'center',
    paddingTop: wp(2),
    paddingBottom: wp('2'),
    borderBottomLeftRadius: wp('4'),
    borderBottomRightRadius: wp('4'),
  },
});
