import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  roomTypes: [],
};

/**
 * Room Type Slice
 */
const roomTypeSlice = createSlice({
  name: "roomType",
  initialState,

  reducers: {
    setRoomTypes(state, action) {
      state.roomTypes = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setRoomTypes } = roomTypeSlice.actions;

export default roomTypeSlice.reducer;
