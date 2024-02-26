import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {wp} from '../../Constants/MyStyle';
import {Colors} from '../../Constants/Colors';
import {HotelImages} from '../../Constants/StaticData';
import {Images} from '../../Constants/Images';

const ImageModal = ({visible, onPressCancel, selectedIndex}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    selectedIndex && setActivePhotoIndex(selectedIndex);
  }, [selectedIndex]);

  const currentImage = HotelImages[activePhotoIndex];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}>
      <StatusBar
        backgroundColor="rgba(0,0,0,0.86)"
        translucent
        barStyle={'light-content'}
      />
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onPressCancel}>
          <View style={styles.modalContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalSubContainer}>
          <TouchableOpacity style={styles.closeCont} onPress={onPressCancel}>
            <Image source={Images.close} style={styles.close} />
          </TouchableOpacity>
          <Image source={currentImage} style={styles.fullImg} />
          <View style={styles.bottomCont}>
            {activePhotoIndex !== 0 ? (
              <TouchableOpacity
                onPress={() => {
                  activePhotoIndex > 0 &&
                    setActivePhotoIndex(activePhotoIndex - 1);
                }}>
                <Image source={Images.previous} style={styles.close} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {activePhotoIndex !== HotelImages?.length - 1 && (
              <TouchableOpacity
                onPress={() => {
                  activePhotoIndex < HotelImages?.length - 1 &&
                    setActivePhotoIndex(activePhotoIndex + 1);
                }}>
                <Image source={Images.next} style={styles.close} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalSubContainer: {
    width: wp(100),
    height: '64%',
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
  },
  fullImg: {
    width: wp(100),
    height: wp(100),
    resizeMode: 'cover',
  },
  close: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  closeCont: {alignSelf: 'flex-end', marginRight: wp(4), marginBottom: wp(4)},
  bottomCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(90),
    marginTop: wp(6),
  },
});

export default ImageModal;
