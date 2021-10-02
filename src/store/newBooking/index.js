import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  branchData: {
    arrival: "",
    departure: "",
    branchId: "",
  },
  roomData: {},
};

/**
 * Booking Slice
 */
const newBookingSlice = createSlice({
  name: "newBooking",
  initialState,

  reducers: {
    setBookingBrachData(state, action) {
      state.branchData = action.payload;
    },
    setBookingRoomData(state, action) {
      state.roomData = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setBookingBrachData, setBookingRoomData } =
  newBookingSlice.actions;

export default newBookingSlice.reducer;
