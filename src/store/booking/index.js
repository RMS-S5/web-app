import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  monthlyCompletedBookings: [],
  bookings: [],

};

/**
 * Booking Slice
 */
const bookingSlice = createSlice({
  name: "booking",
  initialState,

  reducers: {
    setMonthlyCompletedBookings(state, action) {
      state.monthlyCompletedBookings = action.payload;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
  setMonthlyCompletedBookings,
  setBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
