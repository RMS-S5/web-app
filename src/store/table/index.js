import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  tables: [],

};

/**
 * Table Slice
 */
const tableSlice = createSlice({
  name: "table",
  initialState,

  reducers: {
    setTables(state, action) {
      state.tables = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setTables
} = tableSlice.actions;

export default tableSlice.reducer;
