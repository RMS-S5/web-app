import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getMonthlyCompletedBookings = createDraftSafeSelector(
    (state) => state.booking,
    (booking) => booking.monthlyCompletedBookings
);

export const getAllBookings = createDraftSafeSelector(
    (state) => state.booking,
    (booking) => booking.bookings
);
