import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StaticData} from '../Constants/StaticData';
import {textStyle, wp} from '../Constants/MyStyle';
import {Colors} from '../Constants/Colors';
import HomeHeader from '../Components/Headers/HomeHeader';
import SearchCard from '../Components/Cards/SearchCard';
import Carousel from 'react-native-snap-carousel';
import {BlurView} from '@react-native-community/blur';
import {Images} from '../Constants/Images';

const hotelURL =
  'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?cs=srgb&dl=pexels-donald-tong-189296.jpg&fm=jpg';
const roomURL =
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const HomeScreen = () => {
  const _renderItem = ({item, index}) => {
    return (
      <View style={{height: wp('70'), width: wp('60')}}>
        <Image source={{uri: roomURL}} style={styles.hotelImage} />
        <View style={styles.blurContainer}>
          <BlurView style={styles.blurView} blurType="light" blurAmount={2}>
            <View style={{gap: wp(1)}}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.locationCont}>
                <Image source={Images.location} style={styles.locationImg} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.locationCont}>
                <Image source={Images.star} style={styles.starImg} />
                <Text style={styles.locationText}>{item.rating} Ratting</Text>
              </View>
            </View>
          </BlurView>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={textStyle(4, Colors.white, 5)}>Book now</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'pink',
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
  },
  blurView: {
    flex: 1,
    width: wp('54'),
    padding: wp('3'),
  },
  name: {
    ...textStyle(3.8, Colors.white, 5),
  },
  locationText: {
    ...textStyle(3, Colors.white, 5),
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
    tintColor: Colors.white,
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
