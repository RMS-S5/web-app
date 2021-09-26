import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getMonthlyCompletedOrders = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.monthlyCompletedOrders
);

export const getAllOrders = createDraftSafeSelector(
    (state) => state.order,
    (order) => order.orders
);
