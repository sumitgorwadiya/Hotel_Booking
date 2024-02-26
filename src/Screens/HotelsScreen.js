import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../Constants/Colors';
import SubHeader from '../Components/Headers/SubHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import HotelCard from '../Components/Cards/HotelCard';
import {wp} from '../Constants/MyStyle';

const HotelsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const travelerData = route?.params?.travelerData;

  return (
    <View style={styles.container}>
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
