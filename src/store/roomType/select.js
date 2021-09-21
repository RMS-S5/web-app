import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllRoomTypes = createDraftSafeSelector(
  (state) => state.roomType,
  (roomType) => roomType.roomDetails
);
