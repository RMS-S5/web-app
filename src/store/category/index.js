import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  categories:[],

};

/**
 * Food Item Slice
 */
const categorySlice = createSlice({
  name: "foodItem",
  initialState,

  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setCategories
} = categorySlice.actions;

export default categorySlice.reducer;
