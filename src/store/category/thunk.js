import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setCategories
} from "./index";

export default class categoryThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add Category
   */
  static addCategory(categoryData) {
    console.log("########") //test
    console.log("categoryData", categoryData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.category.add.category(categoryData);
      if (res.status === 200) {
        const [res1, data] = await api.category.get.allCategories();
        if (res1.status === 200) {
          dispatch(setCategories(data));
        }
      }
      return res;
    }
  }

  

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Categories
   */
  static getAllCategories(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.category.get.allCategories(query);      
      if (res.status === 200) {
        dispatch(setCategories(data));
      }
      return res;
    }
  }

  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove Category
   */
  static removeCategory(categoryId) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data1] = await api.category.remove.removeCategory(categoryId);
      if (res.status === 200) {
        const [res1, data] = await api.category.get.allCategories();
        
        if (res1.status === 200) {
          dispatch(setCategories(data));
        }
      }
      return res;
    }
  }



}
