import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllFoodItems = createDraftSafeSelector(
    (state) => state.foodItem,
    (foodItem) => foodItem.foodItems
);
