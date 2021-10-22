import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllTables = createDraftSafeSelector(
    (state) => state.table,
    (table) => table.tables
);
