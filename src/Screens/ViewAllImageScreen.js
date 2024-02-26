import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {HotelImages} from '../Constants/StaticData';
import {wp} from '../Constants/MyStyle';
import ImageModal from '../Components/Modals/ImageModal';
import SubHeader from '../Components/Headers/SubHeader';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../Constants/Colors';

const ViewAllImageScreen = () => {
  const navigation = useNavigation();
  const [imageVisible, setImageVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <SubHeader
        onPressBack={() => {
          navigation.goBack();
        }}
        text={'Photos'}
      />
      <View style={styles.imgCont}>
        <FlatList
          data={HotelImages}
          numColumns={2}
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
          contentContainerStyle={{paddingBottom: wp(30)}}
          showsVerticalScrollIndicator={false}
        />
      </View>
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

export default ViewAllImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: wp(10),
  },
  img: {
    width: wp(42),
    height: wp(42),
    margin: wp(1.5),
    borderRadius: wp(1),
  },
  imgCont: {
    width: wp(90),
    alignSelf: 'center',
  },
});
