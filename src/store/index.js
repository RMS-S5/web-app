import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import uiReducer from "./ui";

import userReducer, {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
} from "./user";

import productReducer, { setCategories, setProducts } from "./product";

import orderReducer, { setCoupons, setOrders, setOrderCounts } from "./order";

import staffReducer, { setBranches, setRoles, setStaffm } from "./staff";

import customerReducer, { setBookings, setAccountLevel } from "./customer";
import roomTypeReducer, { setRoomDetails } from "./roomType";
/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";
import productThunk from "./product/thunk";
import orderThunk from "./order/thunk";

import staffThunk from "./staff/thunk";
import customerThunk from "./customer/thunk";
import roomTypeThunk from "./roomType/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    staff: staffReducer,
    customer: customerReducer,
    roomType: roomTypeReducer,
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
  product: {
    setCategories,
    setProducts,
  },
  order: {
    setCoupons,
    setOrders,
    setOrderCounts,
  },
  staff: {
    setBranches,
    setRoles,
    setStaffm,
  },
  customer: {
    setAccountLevel,
    setBookings,
  },
  roomType: {
    setRoomDetails,
  },
};

export const thunks = {
  user: userThunk,
  product: productThunk,
  order: orderThunk,
  staff: staffThunk,
  customer: customerThunk,
  roomType: roomTypeThunk,
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
