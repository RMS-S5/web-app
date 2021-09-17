import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import uiReducer from "./ui";

import userReducer, {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
    setManagers
} from "./user";

import staffReducer , {
  setBranches,
  setRoles,
  setStaffm
} from "./staff";

import roomTypeReducer , {
  setRoomTypes
} from "./roomType";

/**
 * Thunk Actions
 */
import userThunk from "./user/thunk";
import staffThunk from "./staff/thunk";
import roomTypeThunk from "./roomType/thunk";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    staff : staffReducer,
    roomType : roomTypeReducer,
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
    setManagers
  },
  staff : {
    setBranches,
    setRoles,
    setStaffm
  },
  roomType : {
    setRoomTypes
  },
};

export const thunks = {
  user: userThunk,
  staff : staffThunk,
  roomType: roomTypeThunk

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

