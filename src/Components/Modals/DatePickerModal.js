import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {hp, textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import SubHeader from '../Headers/SubHeader';
import SolidButton from '../Buttons/SolidButton';
import CalendarPicker from 'react-native-calendar-picker';

const DatePickerModal = ({
  visible,
  onPressCancel,
  setCheckInDate,
  setCheckOutDate,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [checkOutError, setCheckOutError] = useState(false);

  const minDate = new Date(); // Today
  const maxDate = new Date(2087, 6, 3);

  useEffect(() => {
    if (checkOutError) {
      selectedStartDate && selectedEndDate && setCheckOutError(false);
    }
  }, [checkOutError, selectedStartDate, selectedEndDate]);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}>
      <View style={styles.modalSubContainer}>
        <View style={styles.container}>
          <SubHeader
            onPressBack={onPressCancel}
            text={'Check-In / Check-Out'}
          />
          <View style={styles.subCont}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor={Colors.orange}
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
            {checkOutError && (
              <Text style={styles.errorText}>
                Please select Check-In/Out date
              </Text>
            )}
            <SolidButton
              text={'Apply'}
              otherStyle={{marginTop: wp(12), height: wp(13)}}
              onPress={() => {
                if (!selectedEndDate || !selectedStartDate) {
                  setCheckOutError(true);
                } else {
                  setCheckInDate(selectedStartDate);
                  setCheckOutDate(selectedEndDate);
                  onPressCancel();
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    flex: 1,
  },
  modalSubContainer: {
    width: wp(100),
    heightL: hp(100),
    backgroundColor: 'red',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subCont: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: wp(4),
  },
  errorText: {
    ...textStyle(2.7, 'red', 5),
    textAlign: 'right',
    marginTop: wp(3),
    marginBottom: wp(-3),
    marginRight: wp(6),
  },
});

export default DatePickerModal;
