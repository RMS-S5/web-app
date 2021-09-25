import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllBookings = createDraftSafeSelector(
  (state) => state.customer,
  (customer) => customer.bookings
);

export const getAccountType = createDraftSafeSelector(
  (state) => state.customer,
  (customer) => customer.accountType
);
