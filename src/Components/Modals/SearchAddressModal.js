import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SearchBox from '../Cards/SearchBox';
import {popularCityData} from '../../Constants/StaticData';
import {Images} from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';
import {hp, textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const SearchAddressModal = ({visible, onPressCancel, setUserLocation}) => {
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    if (search?.length > 1) {
      const searchResults = searchLocations(search);
      console.log(searchResults);
      setSearchData(searchResults);
    }
  }, [search]);

  const searchLocations = query => {
    const formattedQuery = query.toLowerCase();
    return popularCityData.filter(({location}) =>
      location.toLowerCase().includes(formattedQuery),
    );
  };

  const renderCities = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.navigationLocCont}
        onPress={() => {
          setUserLocation(item?.location);
          onPressCancel();
        }}>
        <Image source={Images.navigation} style={styles.navigationIcon} />
        <Text style={styles.navigationText}>{item.location}</Text>
      </TouchableOpacity>
    );
  };

  const locationData = search?.length > 1 ? searchData : popularCityData;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}>
      <View style={styles.modalSubContainer}>
        <View style={styles.container}>
          <SearchBox
            search={search}
            setSearch={setSearch}
            onPressBack={onPressCancel}
          />
          <View style={styles.subCont}>
            <Text style={styles.popularSearchText}>
              {search?.length > 1 ? 'Search Data...' : 'Popular Searches'}
            </Text>
            {locationData?.length > 0 ? (
              <FlatList
                data={locationData}
                renderItem={renderCities}
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
              />
            ) : (
              <Text style={styles.noDataText}>
                No Hotels available on this location
              </Text>
            )}
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
  LocIcon: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    marginRight: wp(4),
    tintColor: 'blue',
  },
  navigationIcon: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    marginRight: wp(4),
  },
  currentLocCont: {
    backgroundColor: Colors.white,
    height: wp('13'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: wp(94),
    alignSelf: 'center',
    marginTop: wp(3),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    marginBottom: wp(4),
  },
  navigationLocCont: {
    backgroundColor: Colors.white,
    height: wp('15'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: wp(94),
    alignSelf: 'center',
    marginTop: wp(0.3),
    borderRadius: wp(1),
    paddingHorizontal: wp(4),
  },
  popularSearchText: {
    ...textStyle(4.2, Colors.black, 5),
    paddingHorizontal: wp(3),
    marginBottom: wp(3),
  },
  navigationText: {
    ...textStyle(3.8, Colors.gray, 5),
  },
  noDataText: {
    ...textStyle(3.8, Colors.gray, 4),
    textAlign: 'center',
    marginTop: wp('10'),
  },
});

export default SearchAddressModal;
