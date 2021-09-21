import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  roomDetails: [],
};

/**
 * Product Slice
 */
const roomTypeSlice = createSlice({
  name: "roomType",
  initialState,

  reducers: {
    setRoomDetails(state, action) {
      state.roomDetails = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setRoomDetails } = roomTypeSlice.actions;

export default roomTypeSlice.reducer;
