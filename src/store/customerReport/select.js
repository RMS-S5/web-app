import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getAllCustomerReports = createDraftSafeSelector(
    (state) => state.customerReport,
    (customerReport) => customerReport.customerReports
);
