import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  monthlyCompletedBookings: [],

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

  },
});

/**
 * Exports
 */
export const {
  setMonthlyCompletedBookings
} = bookingSlice.actions;

export default bookingSlice.reducer;
