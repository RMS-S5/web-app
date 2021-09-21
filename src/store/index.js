import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import uiReducer from "./ui";

import userReducer, {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
    setAdmins
} from "./user";

import productReducer , {
  setCategories,
  setProducts
} from "./product";

import staffReducer , {
  setBranches,
  setRoles,
  setStaffm
} from "./staff";

import roomTypeReducer , {
  setRoomTypes
} from "./roomType";

import orderReducer , {
  setMonthlyCompletedOrders
} from "./order";

import bookingReducer , {
  setMonthlyCompletedBookings
} from "./booking";

/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";
import productThunk from "./product/thunk";

import staffThunk from "./staff/thunk";
import roomTypeThunk from "./roomType/thunk";
import orderThunk from "./order/thunk";
import bookingThunk from "./booking/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    product : productReducer,
    
    staff : staffReducer,
    roomType : roomTypeReducer,
    order : orderReducer,
    booking : bookingReducer,
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
    setAdmins
  },
  product : {
    setCategories,
    setProducts
  },

  staff : {
    setBranches,
    setRoles,
    setStaffm
  },
  roomType : {
    setRoomTypes
  },
  order : {
    setMonthlyCompletedOrders
  },
  booking : {
    setMonthlyCompletedBookings
  },
};

export const thunks = {
  user: userThunk,
  product : productThunk,
  
  staff : staffThunk,
  roomType: roomTypeThunk,
  order : orderThunk,
  booking : bookingThunk,

};


/**
 * Helper Function
 */
export function cleanQuery(query , fields = null) {
  const qClone = {...query}
  Object.keys(qClone).forEach(
      (k) => {
        if (fields === null || fields.includes(k) ) {
          (qClone[k] === null || qClone[k] === undefined) && delete qClone[k]
        } else {
          delete qClone[k]
        }

      }
  )

  return qClone
}

