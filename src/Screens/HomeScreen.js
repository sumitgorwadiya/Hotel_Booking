import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StaticData} from '../Constants/StaticData';
import {textStyle, wp} from '../Constants/MyStyle';
import {Colors} from '../Constants/Colors';
import HomeHeader from '../Components/Headers/HomeHeader';
import SearchCard from '../Components/Cards/SearchCard';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../Constants/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Screens} from '../Config/Stack/Screens';

const hotelURL =
  'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?cs=srgb&dl=pexels-donald-tong-189296.jpg&fm=jpg';
export const roomURL =
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(0);
  //   const userLocation = route?.params?.userLocation;
  useEffect(() => {
    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 300);
  }, [refresh]);

  const openHotel = item => {
    const travelerDataNew = {selectedHotelData: item};
    navigation.navigate(Screens.HotelDetailScreen, {
      travelerData: travelerDataNew,
    });
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{height: wp('70'), width: wp('60')}}
        onPress={() => openHotel(item)}>
        <Image source={Images.room} style={styles.hotelImage} />
        <View style={styles.blurContainer}>
          <View style={styles.blurView} blurType="light" blurAmount={2}>
            {refresh > 0 && (
              <View style={{gap: wp(1)}} key={refresh}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.locationCont}>
                  <Image source={Images.location} style={styles.locationImg} />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.locationCont}>
                  <Image source={Images.star} style={styles.starImg} />
                  <Text style={styles.locationText}>
                    {item.rating}/10 Ratting
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => openHotel(item)}>
          <Text style={textStyle(4, Colors.white, 5)}>Book now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <HomeHeader />
      <SearchCard />
      <Text style={styles.title}>Popular Hotels !</Text>
      <Carousel
        data={StaticData}
        renderItem={_renderItem}
        sliderWidth={wp('104')}
        itemWidth={wp('60')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  title: {
    paddingHorizontal: wp('5'),
    ...textStyle(5.6, Colors.black, 7),
    marginTop: wp('16'),
    marginBottom: wp(6),
  },
  hotelImage: {
    width: wp('54'),
    height: '100%',
    resizeMode: 'cover',
    borderRadius: wp('4'),
  },
  blurContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%', // Adjust the height of the blurred portion
    overflow: 'hidden',
    width: wp('54'),
    borderBottomLeftRadius: wp('4'),
    borderBottomRightRadius: wp('4'),
  },
  blurView: {
    flex: 1,
    width: wp('54'),
    padding: wp('3'),
    height: '100%',
    backgroundColor: Colors.white2,
  },
  name: {
    ...textStyle(3.8, Colors.black, 5),
  },
  locationText: {
    ...textStyle(3, Colors.black, 5),
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  locationImg: {
    width: wp(2.4),
    height: wp(2.4),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  starImg: {
    width: wp(2.4),
    height: wp(2.4),
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: Colors.orange,
    position: 'absolute',
    right: wp(0),
    bottom: wp(-3),
    width: wp(28),
    height: wp(10),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
