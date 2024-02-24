import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Constants/Colors';

const HotelsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HotelsScreen</Text>
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
