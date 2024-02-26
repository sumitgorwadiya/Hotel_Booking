import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {Colors} from '../Constants/Colors';
import {StatusBar, StyleSheet, View} from 'react-native';
import {hp, wp} from '../Constants/MyStyle';
import {AsKey} from '../Constants/AsKey';
import {StaticData} from '../Constants/StaticData';
import {getAsData, storeAsData} from '../Constants/StoreFunctions';
import {useDispatch} from 'react-redux';
import {storeAllHotelData} from '../Config/Redux/Slices/HotelInfoSlice';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [i, setI] = useState(0);
  const p = useSharedValue(180);
  const o = useSharedValue(0.1);
  const w = useSharedValue(160);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getAsData(AsKey.hotelData).then(res => {
      console.log('res -->', res);
      if (!res) {
        storeAsData(AsKey.hotelData, StaticData);
        dispatch(storeAllHotelData(StaticData));
      } else {
        dispatch(storeAllHotelData(res));
      }
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: p.value,
      height: p.value,
      borderRadius: p.value / 2,
      opacity: 0.7,
      borderWidth: 1,
      borderColor: Colors.orange,
    };
  });

  const animatedStyles2 = useAnimatedStyle(() => {
    return {
      width: p.value + 16,
      height: p.value + 16,
      borderRadius: p.value / 2 + 8,
      opacity: o.value - 0.1,
      borderWidth: o.value * 4,
      borderColor: Colors.orange,
    };
  });
  const animatedStyles3 = useAnimatedStyle(() => {
    return {
      width: p.value + 32,
      height: p.value + 32,
      borderRadius: p.value / 2 + 16,
      opacity: o.value - 0.1,
      borderWidth: o.value * 4,
      borderColor: Colors.orange,
    };
  });
  const animatedStyles4 = useAnimatedStyle(() => {
    return {
      width: p.value + 48,
      height: p.value + 48,
      borderRadius: p.value / 2 + 24,
      opacity: o.value - 0.1,
      borderWidth: o.value * 4,
      borderColor: Colors.orange,
    };
  });
  const animatedStyles5 = useAnimatedStyle(() => {
    return {
      width: p.value + 60,
      height: p.value + 60,
      borderRadius: p.value / 2 + 30,
      opacity: o.value - 0.1,
      borderWidth: o.value * 4,
      borderColor: Colors.orange,
    };
  });
  const circleStyle = useAnimatedStyle(() => {
    return {
      width: w.value,
      height: w.value,
      borderRadius: w.value / 2,
    };
  });

  useEffect(() => {
    if (p.value >= 100) {
      p.value = withDelay(500, withSpring(30));
      o.value = withDelay(500, withSpring(0));
    } else {
      p.value = withDelay(500, withSpring(180));
      o.value = withDelay(500, withSpring(0));
    }
    if (w.value >= 100) {
      w.value = withDelay(500, withSpring(20));
    } else {
      w.value = withDelay(500, withSpring(1000));
    }
    setTimeout(() => {
      setI(i + 1);
    }, 1000);
  }, [i]);

  return (
    <View
      style={[styles.cont, {backgroundColor: Colors.white}]}
      key={Colors.orange}>
      {Colors.orange && (
        <>
          <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle={'dark-content'}
          />
          <View style={styles.subCont}>
            <Animated.View
              style={[
                {
                  ...styles.outerCircle,
                  borderColor: Colors.orange,
                },
                animatedStyles,
              ]}>
              <Animated.View
                style={[
                  {
                    ...styles.outerCircle,
                    borderColor: Colors.orange,
                  },
                  animatedStyles2,
                ]}>
                <Animated.View
                  style={[
                    {
                      ...styles.outerCircle,
                      borderColor: Colors.orange,
                    },
                    animatedStyles3,
                  ]}>
                  <Animated.View
                    style={[
                      {
                        ...styles.outerCircle,
                        borderColor: Colors.orange,
                      },
                      animatedStyles4,
                    ]}>
                    <Animated.View
                      style={[
                        {
                          ...styles.outerCircle,
                          borderColor: Colors.orange,
                        },
                        animatedStyles5,
                      ]}>
                      <Animated.View style={styles.circleBig} />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.circle, circleStyle]} />
          </View>
        </>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp(10),
  },
  outerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCont: {
    width: wp(80),
    height: wp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.orange,
    position: 'absolute',
  },
  circleBig: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});
