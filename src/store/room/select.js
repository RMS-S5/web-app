import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllRooms = createDraftSafeSelector(
  (state) => state.room,
  (room) => room.rooms
);
export const getAllAvailableRoomsByBranch = createDraftSafeSelector(
  (state) => state.room,
  (room) => room.allAvailableRooms
);
