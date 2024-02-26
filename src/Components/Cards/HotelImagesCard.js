import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {HotelImages} from '../../Constants/StaticData';
import {textStyle, wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import ImageModal from '../Modals/ImageModal';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../Config/Stack/Screens';

const HotelImagesCard = () => {
  const navigation = useNavigation();
  const [imageVisible, setImageVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <View>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Photos</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.ViewAllImageScreen);
          }}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={HotelImages}
        numColumns={3}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setImageVisible(true);
                setSelectedIndex(index);
              }}>
              <Image source={item} style={styles.img} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{height: wp(48)}}
      />
      <ImageModal
        visible={imageVisible}
        onPressCancel={() => {
          setImageVisible(false);
        }}
        selectedIndex={selectedIndex}
      />
    </View>
  );
};

export default HotelImagesCard;

const styles = StyleSheet.create({
  title: {
    ...textStyle(4.8, Colors.black, 7),
  },
  viewAll: {
    ...textStyle(3.2, Colors.gray, 7),
  },
  img: {
    resizeMode: 'cover',
    width: wp(28),
    height: wp(22),
    marginRight: wp(3),
    marginBottom: wp(3),
    borderRadius: wp(2),
  },
  titleCont: {
    marginTop: wp(8),
    marginBottom: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
