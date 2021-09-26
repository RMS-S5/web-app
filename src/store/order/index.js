import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  monthlyCompletedOrders: [],
  orders: [],

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
    setOrders(state, action) {
      state.orders = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
  setMonthlyCompletedOrders,
  setOrders
} = orderSlice.actions;

export default orderSlice.reducer;
