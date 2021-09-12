import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  staffm : [],
  branches : [],
  roles : []

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

    setRoles(state, action) {
      state.roles = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setBranches,
    setRoles,
    setStaffm
} = staffSlice.actions;

export default staffSlice.reducer;
