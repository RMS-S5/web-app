import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getBookingBranchData = createDraftSafeSelector(
  (state) => state.newBooking,
  (newBooking) => newBooking.branchData
);

export const getBookingRoomData = createDraftSafeSelector(
  (state) => state.newBooking,
  (newBooking) => newBooking.roomData
);
