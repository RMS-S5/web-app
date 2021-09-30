import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setFoodItems
} from "./index";

export default class foodItemThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add Food Item
   */
  static addFoodItem(foodItemData) {
    console.log("########") //test
    console.log("foodItemData", foodItemData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.foodItem.add.foodItem(foodItemData);
      if (res.status === 200) {
        const [res1, data] = await api.foodItem.get.allFoodItems();
        if (res1.status === 200) {
          dispatch(setFoodItems(data));
        }
      }
      return res;
    }
  }

  /**
   * ------------------Update------------------------------
   */
  /**
   * Update Food Item
   */
  static updateFoodItem(foodItemId, foodItemData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data1] = await api.foodItem.put.updateFoodItem(foodItemId, foodItemData);
      //const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        const [res1, data] = await api.foodItem.get.allFoodItems();
        // const [res1, data] = [{ status: 200 },
        // [
        //   {
        //     foodItemId: "f1",
        //     name: "Cheese Burger",
        //     categoryName: "Burger",
        //     description: "",
        //     price: "800",
        //   },
        //   {
        //     foodItemId: "f2",
        //     name: "Pepperoni Pizza",
        //     categoryName: "Pizza",
        //     description: "",
        //     price: "1200",
        //   }
        // ]
        // ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
          dispatch(setFoodItems(data));
        }
      }
      return res;
    }
  }

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All FoodI tems
   */
  static getAllFoodItems(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.foodItem.get.allFoodItems(query);
      // const [res, data] = [{ status: 200 },
      // [
      //   {
      //     id: "f1",
      //     name: "Cheese Burger",
      //     categoryName: "Burger",
      //     description: "",
      //     price: "800",
      //   },
      //   {
      //     id: "f2",
      //     name: "Pepperoni Pizza",
      //     categoryName: "Pizza",
      //     description: "",
      //     price: "1200",
      //   }
      // ]
      // ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setFoodItems(data));
      }
      return res;
    }
  }

  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove Food Item
   */
  static removeFoodItem(id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data1] = await api.foodItem.remove.removeFoodItem(id);
      // const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        const [res1, data] = await api.foodItem.get.allFoodItems();
        // let [res1, data] = [{ status: 200 },
        // [

        //   {
        //     id: "f2",
        //     name: "Pepperoni Pizza",
        //     categoryName: "Pizza",
        //     description: "",
        //     price: "1200",
        //   }

        // ]
        // ] //todo:remove mock
        if (res1.status === 200) {
          dispatch(setFoodItems(data));
        }
      }
      return res;
    }
  }



}
