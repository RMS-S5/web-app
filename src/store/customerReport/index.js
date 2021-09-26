import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  customerReports: [],

};

/**
 * Customer Report Slice
 */
const customerReportSlice = createSlice({
  name: "customerReport",
  initialState,

  reducers: {
    setCustomerReports(state, action) {
      state.customerReports = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
  setCustomerReports
} = customerReportSlice.actions;

export default customerReportSlice.reducer;
