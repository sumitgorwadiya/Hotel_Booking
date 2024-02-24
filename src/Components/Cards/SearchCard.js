import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Images} from '../../Constants/Images';
import {Colors} from '../../Constants/Colors';
import SolidButton from '../Buttons/SolidButton';

const SearchCard = () => {
  const renderCard = ({imgSrc, text}) => {
    return (
      <View style={styles.cardCont}>
        <Image source={imgSrc} style={styles.location} />
        <Text style={styles.cardText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard({
        imgSrc: Images.search,
        text: 'Search anywhere',
      })}
      {renderCard({
        imgSrc: Images.calendar,
        text: 'Check-In / Check-Out',
      })}
      {renderCard({
        imgSrc: Images.person,
        text: '1 Rooms 2 Adults',
      })}
      <SolidButton text={'Search'} />
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
  location: {
    width: wp('4.2'),
    height: wp('4.2'),
    resizeMode: 'contain',
    tintColor: Colors.gray,
  },
});
