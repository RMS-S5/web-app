import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";
import {
  setManagers,
  setProfileData,
  setTokenData,
  setUserData,
  updateProfileData,
} from "./index";

export default class userThunk {

  /**
   * Login
   * @param email
   * @param password
   * @returns {function(*, *): {message: string, status: number}|{message: *, status: *}}
   */
  static managerLogin(email, password) {
    return async (dispatch, getState) => {
      const [res, data] = await api.user.login.manager(email, password);
      console.log(res);
      if (res.status === 200) {
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
      if (!accessToken) return;
      const payload = jwtDecode(accessToken);
      if (!payload) return;

      dispatch(
        setUserData(
          _.pick(payload, [
            "userId",
            "name",
            "userType",
            "mobile",
              "image" //todo:include rest of the attributes
          ])
        )
      );

      const refreshToken = localStorage.getItem("pv-refresh-token");
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
        const [res, data] = await api.user.get.managerProfile();
        if (res.status === 200) {
          dispatch(setProfileData(data));
        }
        return res;
      } else {
        return { status: 200 };
      }
    };
  }

  static getAllManagers() {
    return async (dispatch , getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res,data] =  await api.user.get.managers();
      if (res.status === 200) {
        dispatch(setManagers(data));
      }
      return res;
    }
  }

  /**
   * Update
   * @param profileData
   * @returns
   */
  static updateManagerProfile(profileData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.put.updateManagerProfile(profileData);
      if (res.status === 200) {
        const [res, data] = await api.user.get.managerProfile();
        if (res.status === 200) {
          dispatch(setProfileData(data));
          dispatch(setUserData(data));

        }
      }
      return res;
    };
  }

  static changeManagerPassword(passwordData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.put.changeManagerPassword(passwordData);
      return res;
    };
  }

  static updateManagerStatus(userId, status) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.user.put.changeStatus(userId, status);
      if (res.status === 200) {
        const [res,data] =  await api.user.get.managers();
        if (res.status === 200) {
          dispatch(setManagers(data));
        }
      }
      return res;
    };
  }

}
