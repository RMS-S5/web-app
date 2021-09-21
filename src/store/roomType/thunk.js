import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "../../api";

import { setRoomDetails } from "./index";

export default class roomTypeThunk {
  /**
   * Get All Orders
   */
  static getAllRoomTypes(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.roomType.get.allRoomTypes(query);
      if (res.status === 200) {
        dispatch(setRoomDetails(data));
      }
      return res;
    };
  }
  static checkRoomsAvailability(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.roomType.get.checkRoomsAvailability(query);
      if (res.status === 200) {
        dispatch(setRoomDetails(data));
      }
      return res;
    };
  }
}
