import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  staffm : [],
  branches : [],
  accountTypes : []

};

/**
 * Staff Slice
 */
const staffSlice = createSlice({
  name: "staff",
  initialState,

  reducers: {
    setStaffm(state, action) {
      state.staffm = action.payload;
    },

    setBranches(state, action) {
      state.branches = action.payload;
    },

    setAccountTypes(state, action) {
      state.accountTypes = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setBranches,
    setAccountTypes,
    setStaffm
} = staffSlice.actions;

export default staffSlice.reducer;
