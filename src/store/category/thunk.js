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
   * ------------------Update------------------------------
   */
  /**
   * Update Category
   */
  static updateCategory(category_id, categoryData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.category.put.updateCategory(category_id, categoryData);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.category.get.allCategories();
        const [res1, data] = [{ status: 200 },
        [
          {
            category_id: "c1",
            category_name: "Burgers",
            description: "",
          },
          {
            category_id: "c1",
            category_name: "Pizza",
            description: "",
          }
        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
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
      //const [res, data] = await api.category.get.allCategories(query);
      const [res, data] = [{ status: 200 },
      [
        {
          category_id: "c1",
          category_name: "Burgers",
          description: "",
        },
        {
          category_id: "c1",
          category_name: "Pizza",
          description: "",
        }
      ]
      ] //todo:remove mock
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
  static removeCategory(category_id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.category.remove.removeCategory(category_id);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.category.get.allCategories();
        let [res1, data] = [{ status: 200 },
        [
          {
            category_id: "c1",
            category_name: "Burgers",
            description: "",
          },
          {
            category_id: "c1",
            category_name: "Pizza",
            description: "",
          }

        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          dispatch(setCategories(data));
        }
      }
      return res;
    }
  }



}
