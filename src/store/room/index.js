import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  rooms: [],
  allAvailableRooms: [],
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
    setAllAvailableRooms(state, action) {
      state.allAvailableRooms = action.payload;
    },
  },
});

/**
 * Exports
 */
export const { setAllAvailableRooms, setRooms } = roomSlice.actions;

export default roomSlice.reducer;
