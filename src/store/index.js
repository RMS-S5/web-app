import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import uiReducer from "./ui";

import userReducer, {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
} from "./user";

import staffReducer, { setBranches, setRoles, setStaffm } from "./staff";

import roomTypeReducer, { setRoomTypes } from "./roomType";

import orderReducer, { setMonthlyCompletedOrders, setOrders } from "./order";

import bookingReducer, {
  setMonthlyCompletedBookings,
  setBookings,
} from "./booking";

import customerReportReducer, { setCustomerReports } from "./customerReport";

import roomReducer, { setRooms } from "./room";

import foodItemReducer, { setFoodItems } from "./foodItem";

import categoryReducer, { setCategories } from "./category";

import customerReducer, { setBookings, setAccountLevel } from "./customer";

/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";

import staffThunk from "./staff/thunk";
import roomTypeThunk from "./roomType/thunk";
import orderThunk from "./order/thunk";
import bookingThunk from "./booking/thunk";
import customerReportThunk from "./customerReport/thunk";
import roomThunk from "./room/thunk";
import foodItemThunk from "./foodItem/thunk";
import categoryThunk from "./category/thunk";

import staffThunk from "./staff/thunk";
import customerThunk from "./customer/thunk";
import roomTypeThunk from "./roomType/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,

    staff: staffReducer,
    roomType: roomTypeReducer,
    order: orderReducer,
    booking: bookingReducer,
    customerReport: customerReportReducer,
    room: roomReducer,
    foodItem: foodItemReducer,
    category: categoryReducer,
    customer: customerReducer,
  },

  middleware: getDefaultMiddleware({
    thunk: true,
    immutableCheck: true,
    serializableCheck: true,
  }),
});

/**
 * Store
 */
export default store;

export const actions = {
  user: {
    setUserData,
    setTokenData,
    setProfileData,
    updateProfileData,
  },

  staff: {
    setBranches,
    setRoles,
    setStaffm,
  },
  roomType: {
    setRoomTypes,
  },
  order: {
    setMonthlyCompletedOrders,
    setOrders,
  },
  booking: {
    setMonthlyCompletedBookings,
    setBookings,
  },
  customerReport: {
    setCustomerReports,
  },
  room: {
    setRooms,
  },
  foodItem: {
    setFoodItems,
  },
  category: {
    setCategories,
  },
  customer: {
    setAccountLevel,
    setBookings,
  },
};

export const thunks = {
  user: userThunk,

  staff: staffThunk,
  roomType: roomTypeThunk,
  order: orderThunk,
  booking: bookingThunk,
  customerReport: customerReportThunk,
  room: roomThunk,
  foodItem: foodItemThunk,
  category: categoryThunk,
  customer: customerThunk,
};

/**
 * Helper Function
 */
export function cleanQuery(query, fields = null) {
  const qClone = { ...query };
  Object.keys(qClone).forEach((k) => {
    if (fields === null || fields.includes(k)) {
      (qClone[k] === null || qClone[k] === undefined) && delete qClone[k];
    } else {
      delete qClone[k];
    }
  });

  return qClone;
}
