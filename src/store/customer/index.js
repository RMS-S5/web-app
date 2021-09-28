import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  bookings: [],
  accountLevel: "",
};

/**
 * Product Slice
 */
const customerSlice = createSlice({
  name: "customer",
  initialState,

  reducers: {
    setCustomerBookings(state, action) {
      state.bookings = action.payload;
    },

    setAccountLevel(state, action) {
      state.accountLevel = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setCustomerBookings, setAccountLevel } = customerSlice.actions;

export default customerSlice.reducer;
