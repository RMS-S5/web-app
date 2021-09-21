import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getMonthlyCompletedOrders = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.monthlyCompletedOrders
);
