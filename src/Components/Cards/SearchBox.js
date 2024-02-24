import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {Images} from '../../Constants/Images';
import {useNavigation} from '@react-navigation/native';

const SearchBox = ({setSearch, search, onPressBack}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={Images.back} style={styles.backIcon} />
      </TouchableOpacity>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder="Search ..."
        style={(textStyle(4.2, Colors.black, 4), {width: '90%'})}
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: wp('13'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: wp(94),
    elevation: 10,
    alignSelf: 'center',
    marginTop: wp(2),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    marginBottom: wp(4),
  },
  backIcon: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    tintColor: Colors.gray,
    marginRight: wp(4),
  },
});
