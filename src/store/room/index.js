import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  rooms: [],

};

/**
 * Room Slice
 */
const roomSlice = createSlice({
  name: "room",
  initialState,

  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setBranches,
    setRoles,
    setRooms
} = roomSlice.actions;

export default roomSlice.reducer;
