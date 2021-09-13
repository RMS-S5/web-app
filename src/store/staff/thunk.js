import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setBranches,
  setRoles,
  setStaffm
} from "./index";

export default class staffThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add Staff
   */
  static addStaff(staffData) {
    console.log("########") //test
    console.log("staffData",  staffData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.staff.add.staff(staffData);
      if (res.status === 200) {
        const [res1, data] = await api.staff.get.allStaffm();
        if (res1.status === 200) {
          dispatch(setStaffm(data));
        }
      }
      return res;
    }
  }

  // /**
  //  * Add Category
  //  */
  // static addCategory(categoryData) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res, data] = await api.category.add.category(categoryData);
  //     if (res.status === 200) {
  //       const [res1, data] = await api.category.get.allCategories();
  //       if (res1.status === 200) {
  //         dispatch(setCategories(data));
  //       }
  //     }
  //     return res;
  //   }
  // }

  // /**
  //  * ------------------Update------------------------------
  //  */
  // /**
  //  * Update Product
  //  */
  // static updateProduct(pCode, productData) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res, data1] = await api.product.put.updateProduct(pCode, productData);
  //     if (res.status === 200) {
  //       const [res1, data] = await api.product.get.allProducts();
  //       if (res1.status === 200) {
  //         dispatch(setProducts(data));
  //       }
  //     }
  //     return res;
  //   }
  // }

  // /**
  //  * Update Category
  //  */
  // static updateCategory(categoryId, categoryData) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     console.log("Thunk check",categoryId, categoryData);
  //     const [res] = await api.category.put.updateCategory(categoryId, categoryData);
  //     if (res.status === 200) {
  //       const [res1, data] = await api.category.get.allCategories();
  //       if (res1.status === 200) {
  //         dispatch(setCategories(data));
  //       }
  //     }
  //     return res;
  //   }
  // }

  // /**
  //  * --------------------Getters----------------------------------------
  //  */
  // /**
  //  * Get All Products
  //  */
  // static getAllProducts(query) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res, data] = await api.product.get.allProducts(query);
  //     if (res.status === 200) {
  //         dispatch(setProducts(data));
  //     }
  //     return res;
  //   }
  // }

  /**
   * get all branches
   */
  static getAllBranches(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.branch.get.allBranches(query);//todo:cahnge
      const [res, data] = [{status: 200}, [{id: "b1", name: "Nugegoda Branch"}, {id: "b2", name: "Panadura Branch"}]] //todo:remove mock
      if (res.status === 200) {
        dispatch(setBranches(data));
      }
      return res;
    }
  }

  /**
   * get all roles
   */
   static getAllRoles(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.role.get.allRoles(query);//todo:cahnge
      const [res, data] = [{status: 200}, [{role: "branch_manager", description: "Branch Manager"}, {role: "waiter", description: "Waiter"}]] //todo:remove mock
      if (res.status === 200) {
        dispatch(setRoles(data));
      }
      return res;
    }
  }

  // /**
  //  * get all categories
  //  */
  //  static getAllRoles(query) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res, data] = await api.role.get.allRoles(query);
  //     if (res.status === 200) {
  //       dispatch(setRoles(data));
  //     }
  //     return res;
  //   }
  // }

  // /**
  //  * ------------------Remove------------------------------
  //  */
  // /**
  //  * Remove Product
  //  */
  // static removeProduct(pCode) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res, data1] = await api.product.remove.removeProduct(pCode);
  //     if (res.status === 200) {
  //       const [res1, data] = await api.product.get.allProducts();
  //       if (res1.status === 200) {
  //         dispatch(setProducts(data));
  //       }
  //     }
  //     return res;
  //   }
  // }

  // /**
  //  * Remove Category
  //  */
  // static removeCategory(categoryId) {
  //   return async (dispatch, getState) => {
  //     registerAccessToken(getState().user.tokens.access);
  //     const [res] = await api.category.remove.removeCategory(categoryId);
  //     if (res.status === 200) {
  //       const [res1, data] = await api.category.get.allCategories();
  //       if (res1.status === 200) {
  //         dispatch(setCategories(data));
  //       }
  //     }
  //     return res;
  //   }
  // }


}
