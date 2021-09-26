import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
//import api from "../../api"

const initialState = {
  foodItems:[],

};

/**
 * Food Item Slice
 */
const foodItemSlice = createSlice({
  name: "foodItem",
  initialState,

  reducers: {
    setFoodItems(state, action) {
      state.foodItems = action.payload;
    },

  },
});

/**
 * Exports
 */
export const {
    setFoodItems
} = foodItemSlice.actions;

export default foodItemSlice.reducer;
