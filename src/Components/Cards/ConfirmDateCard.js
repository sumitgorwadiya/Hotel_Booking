import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const ConfirmDateCard = ({checkInDate, checkOutDate, differenceInDays}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{checkInDate}</Text>
        <Text style={styles.time}>1 PM</Text>
      </View>
      <Text style={styles.time}>
        {differenceInDays == 1
          ? `${differenceInDays} Night`
          : `${differenceInDays} Nights`}
      </Text>
      <View style={styles.subCont}>
        <Text style={styles.title}>{checkOutDate}</Text>
        <Text style={styles.time}>11 AM</Text>
      </View>
    </View>
  );
};

export default ConfirmDateCard;

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    marginTop: wp(5),
    borderTopColor: Colors.grayLight,
    borderTopWidth: wp(0.5),
    paddingVertical: wp(3.5),
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: wp(0.6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...textStyle(4, Colors.black, 7),
  },
  time: {
    ...textStyle(3.2, Colors.gray, 5),
  },
  subCont: {
    alignItems: 'flex-end',
  },
});
