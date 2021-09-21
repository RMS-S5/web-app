import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  monthlyCompletedOrders: [],

};

/**
 * Order Slice
 */
const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    setMonthlyCompletedOrders(state, action) {
      state.monthlyCompletedOrders = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
  setMonthlyCompletedOrders
} = orderSlice.actions;

export default orderSlice.reducer;
