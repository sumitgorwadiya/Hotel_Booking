import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Images} from '../../Constants/Images';
import {Colors} from '../../Constants/Colors';
import SolidButton from '../Buttons/SolidButton';
import SearchAddressModal from '../Modals/SearchAddressModal';
import TravelersModal from '../Modals/TravelersModal';

const SearchCard = () => {
  const [rooms, setRooms] = useState();
  const [adults, setAdults] = useState();
  const [children, setChildren] = useState();
  const [userLocation, setUserLocation] = useState();
  const [travelersVisible, setTravelersVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [travelersActive, setTravelersActive] = useState(false);

  const renderCard = ({imgSrc, text, onPress, filled}) => {
    return (
      <TouchableOpacity style={styles.cardCont} onPress={onPress}>
        <Image source={imgSrc} style={styles.location} />
        <Text style={filled ? styles.cardTextFilled : styles.cardText}>
          {text}
        </Text>
      </TouchableOpacity>
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
      })}
      {renderCard({
        imgSrc: Images.calendar,
        text: 'Check-In / Check-Out',
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
      })}
      <SolidButton text={'Search'} />
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
  location: {
    width: wp('4.2'),
    height: wp('4.2'),
    resizeMode: 'contain',
    tintColor: Colors.gray,
  },
});
