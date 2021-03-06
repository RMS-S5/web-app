import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllStaffm = createDraftSafeSelector(
    (state) => state.staff,
    (staff) => staff.staffm
);

export const getAllBranches = createDraftSafeSelector(
    (state) => state.staff,
    (staff) => staff.branches
);

export const getAllAccountTypes = createDraftSafeSelector(
    (state) => state.staff,
    (staff) => staff.accountTypes
);