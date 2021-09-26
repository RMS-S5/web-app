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

  /**
   * ------------------Update------------------------------
   */
  /**
   * Update Staff
   */
  static updateStaff(user_id, staffData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.staff.put.updateStaff(user_id, staffData);
      const [res, data1] = [{status: 200}, []] //todo:remove mock
      if (res.status === 200) {
                //const [res1, data] = await api.staff.get.allStaffm();
        const [res1, data] = [{status: 200}, 
          [
            {
              user_id: "u1",
              first_name: "Nagitha",
              last_name: "Abeywickrema",
              email: "nagitha.18@uom.lk",
              account_type: "Manager",
              role: "Manager",
              branch_id: "b1",
              branch_name: "Nugegoda Branch",
              status: "available",
              birthday: "02/09/98",
              mobile_number: "0891272786",
              nic: "9812771661V",
            }, 
            {
              user_id: "u2",
              first_name: "DonaldUpdated",
              last_name: "TrumpUpdated",
              email: "donald.18@uom.lk",
              account_type: "Waiter",
              role: "Waiter",
              branch_id: "b1",
              branch_name: "Nugegoda Branch",
              status: "unavailable",
              birthday: "02/09/98",
              mobile_number: "0711272786",
              nic: "6512771661V",
            }
          ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
          dispatch(setStaffm(data));
        }
      }
      return res;
    }
  }


  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Staffm
   */
  static getAllStaffm(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.staff.get.allStaffm(query);
      const [res, data] = [{status: 200}, 
        [
          {
          user_id: "u1",
          first_name: "Nagitha",
          last_name: "Abeywickrema",
          email: "nagitha.18@uom.lk",
          account_type: "Manager",
          role: "Manager",
          branch_id: "b1",
          branch_name: "Nugegoda Branch",
          status: "available",
          birthday: "02/09/98",
          mobile_number: "0891272786",
          nic: "9812771661V",
        }, 
        {
          user_id: "u2",
          first_name: "Donald",
          last_name: "Trump",
          email: "donald.18@uom.lk",
          account_type: "Waiter",
          role: "Waiter",
          branch_id: "b1",
          branch_name: "Nugegoda Branch",
          status: "unavailable",
          birthday: "02/09/98",
          mobile_number: "0711272786",
          nic: "6512771661V",
        }
      ]
    ] //todo:remove mock
      if (res.status === 200) {
          dispatch(setStaffm(data));
      }
      return res;
    }
  }

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

  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove Staff
   */
  static removeStaff(user_id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.staff.remove.removeStaff(user_id);
      const [res, data1] = [{status: 200}, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.staff.get.allStaffm();
        let [res1, data] = [{status: 200}, 
          [
            {
              user_id: "u1",
              first_name: "Nagitha",
              last_name: "Abeywickrema",
              email: "nagitha.18@uom.lk",
              account_type: "Manager",
              role: "Manager",
              branch_id: "b1",
              branch_name: "Nugegoda Branch",
              status: "available",
              birthday: "02/09/98",
              mobile_number: "0891272786",
              nic: "9812771661V",
            }, 
            {
              user_id: "u2",
              first_name: "Donald",
              last_name: "Trump",
              email: "donald.18@uom.lk",
              account_type: "Waiter",
              role: "Waiter",
              branch_id: "b1",
              branch_name: "Nugegoda Branch",
              status: "unavailable",
              birthday: "02/09/98",
              mobile_number: "0711272786",
              nic: "6512771661V",
            }

          ]
        ] //todo:remove mock
        console.log("before")
        console.log(data)
        console.log(user_id)
        data = data.filter(function(obj) {
          return obj.user_id !== user_id;
        });//todo:remove mock
        console.log("after")
        console.log(data)
        if (res1.status === 200) {
          dispatch(setStaffm(data));
        }
      }
      return res;
    }
  }

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
