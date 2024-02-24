import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Constants/Colors';

const HotelDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HotelDetailScreen</Text>
    </View>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
