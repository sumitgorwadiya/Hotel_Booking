import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {Colors} from '../Constants/Colors';
import SubHeader from '../Components/Headers/SubHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StaticData} from '../Constants/StaticData';
import HotelCard from '../Components/Cards/HotelCard';
import {wp} from '../Constants/MyStyle';

const HotelsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const travelerData = route?.params?.travelerData;
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container} key={loading}>
      <SubHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        text={travelerData.userLocation}
      />
      <FlatList
        data={travelerData?.hotelsData}
        renderItem={({item, index}) => {
          return (
            <HotelCard item={item} index={index} travelerData={travelerData} />
          );
        }}
        contentContainerStyle={{marginTop: wp(2)}}
      />
    </View>
  );
};

export default HotelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
