import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";
import {
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
} from "./index";
import { setOrders } from "../order";

export default class userThunk {
  // static userLogin(email, password) {
  //   return async (dispatch, getState) => {
  //     const [res, data] = await api.user.login.user(email, password);
  //     if (res.status === 200) {
  //       dispatch(setUserData(data.data));
  //       dispatch(setTokenData(data.token));
  //     }
  //     return res;
  //   };
  // }
  /**
   * Login
   * @param email
   * @param password
   * @returns {function(*, *): {message: string, status: number}|{message: *, status: *}}
   */
  static login(email, password) {
    return async (dispatch, getState) => {
      const [res, data] = await api.user.login.login(email, password);
      console.log(res);
      if (res.status === 200) {
        console.log("data from database", data.data);
        dispatch(setUserData(data.data));
        dispatch(setProfileData(data.data));
        dispatch(setTokenData(data.token));
      }
      return res;
    };
  }

  /**
   * Token check
   * @returns {function(*, *): undefined}
   */
  static checkToken() {
    return (dispatch, getState) => {
      const accessToken = localStorage.getItem("hrms-access-token");
      console.log("access", accessToken);
      if (!accessToken) return;
      const payload = jwtDecode(accessToken);
      console.log("decode", payload);
      if (!payload) return;

      dispatch(
        setUserData(_.pick(payload, ["userId", "email", "accountType"]))
      );

      const refreshToken = localStorage.getItem("hrms-refresh-token");
      if (!refreshToken) {
        // refreshToken = "";
      }

      dispatch(
        setTokenData({
          access: accessToken,
          refresh: refreshToken,
        })
      );
    };
  }

  /**
   * Getters
   * @returns {function(*, *): Promise<{message: string, status: number}|{message: *, status: *}|{status: number}>}
   */
  static getProfileDetails() {
    return async (dispatch, getState) => {
      if (Object.keys(getState().user.profileData).length === 0) {
        registerAccessToken(getState().user.tokens.access);
        const [res, data] = await api.user.get.adminProfile();
        if (res.status === 200) {
          dispatch(setProfileData(data));
        }
        return res;
      } else {
        return { status: 200 };
      }
    };
  }
  static getUserDataById(customerId) {
    return async (dispatch, getState) => {
      // registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.get.customerById(customerId);
      if (res.status === 200) {
        dispatch(setUserData(data));
        return data;
      }
      return res;
    };
  }
  static changePassword(customerId) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.update.changePassword(customerId);
      if (res.status === 200) {
        //dispatch(setUserData(data));
        return data;
      }
      return res;
    };
  }
  static updateUserProfile(userId, Profiledata) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.update.updateProfile(
        userId,
        Profiledata
      );
      if (res.status === 200) {
        // dispatch(setUserData(data));
        // dispatch(setProfileData(data));
        return res;
      }
      return res;
    };
  }

  static ch;
}
