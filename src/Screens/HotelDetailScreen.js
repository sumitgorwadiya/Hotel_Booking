import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Constants/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {textStyle, wp} from '../Constants/MyStyle';
import {roomURL} from './HomeScreen';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {DetailCard} from '../Components/Cards/HotelCard';
import {Images} from '../Constants/Images';
import FeatureCard from '../Components/Cards/FeatureCard';
import {HotelDescription, HotelImages} from '../Constants/StaticData';
import SolidButton from '../Components/Buttons/SolidButton';
import {Screens} from '../Config/Stack/Screens';
import CheckInCard from '../Components/Cards/CheckInCard';
import TravelersModal from '../Components/Modals/TravelersModal';
import Utility from '../Constants/Utility';
import moment from 'moment';
import DatePickerModal from '../Components/Modals/DatePickerModal';
import HotelImagesCard from '../Components/Cards/HotelImagesCard';

const IMG_HEIGHT = wp(80);

const HotelDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const hotelData = route?.params?.travelerData?.selectedHotelData;
  const travelerData = route?.params?.travelerData;
  const [rooms, setRooms] = useState();
  const [adults, setAdults] = useState();
  const [children, setChildren] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const checkIn = moment(checkInDate).format('DD/MM/YYYY');
  const checkOut = moment(checkOutDate).format('DD/MM/YYYY');
  const [travelersVisible, setTravelersVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    if (travelerData?.rooms) {
      setRooms(travelerData?.rooms);
      setAdults(travelerData?.adults);
      setChildren(travelerData?.children);
    }
  }, [travelerData]);

  useEffect(() => {
    if (travelerData?.checkInDate) {
      setCheckInDate(travelerData?.checkInDate);
      setCheckOutDate(travelerData?.checkOutDate);
    }
  }, [travelerData]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const backAfterVisibleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [-IMG_HEIGHT, 0, (IMG_HEIGHT * 3) / 4, IMG_HEIGHT],
        [0, 0, 0, 1],
      ),
    };
  });

  const backBeforeVisibleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [-IMG_HEIGHT, 0, (IMG_HEIGHT * 3) / 4, IMG_HEIGHT],
        [1, 1, 1, 0],
      ),
    };
  });

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={'light-content'}
      />
      <Animated.ScrollView
        ref={scrollRef}
        bounces={true}
        bouncesZoom={true}
        scrollEventThrottle={16}
        scrollToOverflowEnabled={true}>
        <Animated.Image
          source={Images.room}
          style={[styles.hotelImage, imageAnimatedStyle]}
        />
        <View style={styles.subCont}>
          <DetailCard item={hotelData} isHotelDetail={true} />
          <Text style={styles.title}>Features</Text>
          <FlatList
            horizontal
            data={hotelData?.amenities}
            renderItem={({item, index}) => {
              return <FeatureCard item={item} />;
            }}
          />
          <CheckInCard
            checkInOutDate={checkInDate ? `${checkIn} - ${checkOut}` : null}
            roomsDetails={
              rooms
                ? `${rooms} Rooms, ${adults} Adults, ${'\n'}${children} Kids`
                : null
            }
            onPressDatesEdit={() => {
              setDatePickerVisible(true);
            }}
            onPressRoomEdit={() => {
              setTravelersVisible(true);
            }}
          />
          <HotelImagesCard />
          <Text style={styles.description}>
            {HotelDescription + HotelDescription}
          </Text>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.backAfter, backAfterVisibleStyle]}>
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.backIconAfterCont}>
          <Image source={Images.back} style={styles.backIconAfter} />
        </TouchableOpacity>
        <Text style={styles.title}>{hotelData.name} </Text>
      </Animated.View>
      <Animated.View style={[styles.beforeAfter, backBeforeVisibleStyle]}>
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.backBeforeIconCont}>
          <Image source={Images.back} style={styles.backBeforeIcon} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.bottomBar}>
        <SolidButton
          text={'Select Room'}
          onPress={() => {
            if (!checkInDate) {
              Utility.showError('Please Select Check-In/Check-Out Date');
            } else if (!rooms) {
              Utility.showError('Please Select Rooms And Guest Details');
            } else {
              const travelerDataNew = {
                ...travelerData,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                checkInDateOnly: moment(checkInDate).format('DD/MM/YYYY'),
                checkOutDateOnly: moment(checkOutDate).format('DD/MM/YYYY'),
                children: children,
                rooms: rooms,
                adults: adults,
              };
              navigation.navigate(Screens.SelectRoomScreen, {
                hotelData: hotelData,
                travelerData: travelerDataNew,
              });
            }
          }}
        />
      </View>
      <TravelersModal
        visible={travelersVisible}
        onPressCancel={() => {
          setTravelersVisible(false);
        }}
        setRooms={setRooms}
        setAdults={setAdults}
        setChildren={setChildren}
        rooms={rooms}
        adults={adults}
        children={children}
      />
      <DatePickerModal
        visible={datePickerVisible}
        onPressCancel={() => {
          setDatePickerVisible(false);
        }}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />
    </View>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  hotelImage: {
    width: wp(100),
    height: IMG_HEIGHT,
  },
  subCont: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    top: wp(-6),
    paddingHorizontal: wp(5),
    paddingVertical: wp(8),
    marginBottom: wp(10),
  },
  title: {
    ...textStyle(4.8, Colors.black, 7),
    marginTop: wp(4),
    marginBottom: wp(2),
  },

  description: {
    ...textStyle(3.5, Colors.gray, 4),
    marginTop: wp(4),
    marginBottom: wp(2),
  },
  backAfter: {
    position: 'absolute',
    width: wp(100),
    height: wp(24),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    paddingLeft: wp(6),
    paddingBottom: wp(3),
  },
  beforeAfter: {
    position: 'absolute',
    width: wp(100),
    height: wp(24),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: wp(6),
    paddingBottom: wp(3),
  },
  backIconAfter: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  backIconAfterCont: {position: 'absolute', left: wp(6), bottom: wp(5)},
  backBeforeIcon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  backBeforeIconCont: {
    position: 'absolute',
    width: wp(10),
    height: wp(10),
    bottom: wp(3),
    left: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    height: wp(20),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp(4),
  },
});
