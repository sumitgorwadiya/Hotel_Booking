const {createSlice} = require('@reduxjs/toolkit');

const HotelInfoSlice = createSlice({
  name: 'hotelInfo',
  initialState: {
    allHotelData: null,
  },
  reducers: {
    storeAllHotelData(state, actions) {
      state.allHotelData = actions.payload;
    },
  },
});

export const {storeAllHotelData} = HotelInfoSlice.actions;
export default HotelInfoSlice.reducer;
