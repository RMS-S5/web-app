import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "../../api";

import {
  setTables
} from "./index";

export default class tableThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add Table
   */
  static addTable(tableData) {
    console.log("########") //test
    console.log("tableData", tableData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.table.add.table(tableData);
      if (res.status === 200) {
        const [res1, data] = await api.table.get.allTables();
        if (res1.status === 200) {
          dispatch(setTables(data));
        }
      }
      return res;
    }
  }
 

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Tables
   */
  static getAllTables(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.table.get.allTables(query);
      if (res.status === 200) {
        dispatch(setTables(data));
      }
      return res;
    }
  }



  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove Table
   */
  static removeTable(userId) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data1] = await api.table.remove.removeTable(userId);

      if (res.status === 200) {
        const [res1, data] = await api.table.get.allTables();

        if (res1.status === 200) {
          dispatch(setTables(data));
        }
      }
      return res;
    }
  }



}
