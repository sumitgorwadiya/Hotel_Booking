import {configureStore} from '@reduxjs/toolkit';
import hotelInfoReducer from './Slices/HotelInfoSlice';

export const store = configureStore({
  reducer: {
    hotelInfo: hotelInfoReducer,
  },
});
