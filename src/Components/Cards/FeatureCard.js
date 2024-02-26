import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../Constants/Images';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';

const FeatureCard = ({item}) => {
  const [img, setImg] = useState();
  console.log('item', item);

  useEffect(() => {
    console.log('item', item);
    if (item == 'Spa') {
      setImg(Images.spa);
    } else if (item == 'Food') {
      setImg(Images.food);
    } else if (item == 'Gym') {
      setImg(Images.gym);
    } else if (item == 'Pool') {
      setImg(Images.pool);
    } else if (item == 'Wifi') {
      setImg(Images.wifi);
    } else {
      setImg(Images.star);
    }
  }, [item]);

  return (
    <View>
      <View style={styles.imgCont}>
        {img && <Image source={img} style={styles.imgStyle} />}
      </View>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  imgStyle: {width: wp(7), height: wp(7), resizeMode: 'contain'},
  imgCont: {
    width: wp(16),
    height: wp(16),
    backgroundColor: Colors.white,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    borderRadius: wp(3),
    marginLeft: wp(2),
    marginTop: wp(1),
  },
  text: {
    ...textStyle(3.2, Colors.black, 5),
    textAlign: 'center',
    marginTop: wp(1.6),
  },
});
