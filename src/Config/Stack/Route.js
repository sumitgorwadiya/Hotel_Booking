import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/HomeScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import HotelsScreen from '../../Screens/HotelsScreen';
import HotelDetailScreen from '../../Screens/HotelDetailScreen';
import {Screens} from './Screens';
import {NavigationContainer} from '@react-navigation/native';
import SelectRoomScreen from '../../Screens/SelectRoomScreen';
import ConfirmScreen from '../../Screens/ConfirmScreen';
import ViewAllImageScreen from '../../Screens/ViewAllImageScreen';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.HomeScreen} component={HomeScreen} />
        <Stack.Screen
          name={Screens.NotificationScreen}
          component={NotificationScreen}
          options={{animation: 'fade_from_bottom'}}
        />
        <Stack.Screen name={Screens.HotelsScreen} component={HotelsScreen} />
        <Stack.Screen
          name={Screens.HotelDetailScreen}
          component={HotelDetailScreen}
        />
        <Stack.Screen
          name={Screens.SelectRoomScreen}
          component={SelectRoomScreen}
        />
        <Stack.Screen name={Screens.ConfirmScreen} component={ConfirmScreen} />
        <Stack.Screen
          name={Screens.ViewAllImageScreen}
          component={ViewAllImageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({});
