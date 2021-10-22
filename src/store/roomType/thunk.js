import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import { setRoomTypes } from "./index";

export default class roomTypeThunk {
  /**
   * ------------------Add------------------------------
   */

  /**
   * Add RoomType
   */
  static addRoomType(roomTypeData) {
    console.log("########"); //test
    console.log("roomTypeData", roomTypeData); //test
    console.log("########"); //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.roomType.add.roomType(roomTypeData);
      if (res.status === 200) {
        const [res1, data] = await api.roomType.get.allRoomTypes();
        if (res1.status === 200) {
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    };
  }

  /**
   * ------------------Update------------------------------
   */
  /**
   * Update RoomType
   */
  static updateRoomType(roomType, roomTypeData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      console.log("#@#@#@@#")
      const [res, data1] = await api.roomType.put.updateRoomType(roomType, roomTypeData);
      if (res.status === 200) {
        const [res1, data] = await api.roomType.get.allRoomTypes();
        if (res1.status === 200) {
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    };
  }

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Products
   */
  static getAllRoomTypes(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.roomType.get.allRoomTypes(query);
      if (res.status === 200) {
        dispatch(setRoomTypes(data));
      }
      return res;
    };
  }

  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove RoomType
   */
  static removeRoomType(roomType) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data1] = await api.roomType.remove.removeRoomType(roomType);
      if (res.status === 200) {
        const [res1, data] = await api.roomType.get.allRoomTypes();
        if (res1.status === 200) {
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    };
  }
}
