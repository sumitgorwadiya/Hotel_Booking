import React, {useState} from 'react';
import {Modal, StatusBar, StyleSheet, Text, View} from 'react-native';
import {hp, textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import SubHeader from '../Headers/SubHeader';
import CountBtn from '../Buttons/CountBtn';
import SolidButton from '../Buttons/SolidButton';

const TravelersModal = ({
  visible,
  onPressCancel,
  setRooms,
  setAdults,
  setChildren,
}) => {
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [numberOfAdults, setNumberOfAdults] = useState(2);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const renderCard = ({title, numberCount, setNumberCount, otherStyle}) => {
    return (
      <View style={[styles.cardCont, otherStyle]}>
        <Text style={styles.navigationText}>{title}</Text>
        <CountBtn numberCount={numberCount} setNumberCount={setNumberCount} />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.modalSubContainer}>
        <View style={styles.container}>
          <SubHeader onPressBack={onPressCancel} text={'Add Travelers'} />
          <View style={styles.subCont}>
            <View style={styles.navigationLocCont}>
              {renderCard({
                title: 'Rooms',
                numberCount: numberOfRooms,
                otherStyle: styles.bottomBorder,
                setNumberCount: setNumberOfRooms,
              })}
              {renderCard({
                title: 'Adults',
                numberCount: numberOfAdults,
                otherStyle: styles.bottomBorder,
                setNumberCount: setNumberOfAdults,
              })}
              {renderCard({
                title: 'Kids',
                numberCount: numberOfChildren,
                setNumberCount: setNumberOfChildren,
              })}
            </View>
            <SolidButton
              text={'Apply'}
              otherStyle={{marginTop: wp(10), height: wp(13)}}
              onPress={() => {
                setRooms(numberOfRooms);
                setAdults(numberOfAdults);
                setChildren(numberOfChildren);
                onPressCancel();
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
    backgroundColor: Colors.grayLight,
    paddingTop: wp(4),
  },
  navigationLocCont: {
    backgroundColor: Colors.white,
    width: wp(94),
    alignSelf: 'center',
    marginTop: wp(0.3),
    borderRadius: wp(2),
    elevation: 3,
    paddingHorizontal: wp(2),
  },
  navigationText: {
    ...textStyle(4.5, Colors.black, 5),
  },
  cardCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
  },
  bottomBorder: {borderBottomColor: Colors.gray, borderBottomWidth: 0.4},
});

export default TravelersModal;
