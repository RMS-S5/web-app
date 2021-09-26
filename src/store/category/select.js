import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllCategories = createDraftSafeSelector(
    (state) => state.category,
    (category) => category.categories
);
