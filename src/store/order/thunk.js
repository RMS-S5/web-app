import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setOrders,
  setMonthlyCompletedOrders,
} from "./index";

export default class orderThunk {

  /**
   * --------------------Getters----------------------------------------
   */

  /**
   * Get All Orders
   */
  static getAllOrders(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.order.get.allOrders(query);
      const [res, data] = [{ status: 200 },
      [
        {
          orderId: "o1",
          customerName: "Samuel Jackson",
          totalAmount: "1200",
          tableNumber: "4A",
          branchName: "Nugegoda Branch",
          orderStatus: "Served",
          placedTime: "2021-09-01 00:00:00",
          waiterName: "Manuel",
          kitchenStaffName: "Sandaru",
        },
        {
          orderId: "o2",
          customerName: "Samuel Jackson",
          totalAmount: "1200",
          tableNumber: "4A",
          branchName: "Nugegoda Branch",
          orderStatus: "Served",
          placedTime: "2021-09-05 00:00:00",
          waiterName: "Sandun",
          kitchenStaffName: "Vinura",
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setOrders(data));
      }
      return res;
    }
  }

  /**
   * Get Monthly Completed Orders
   */
  static getMonthlyCompletedOrders(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.order.get.monthlyCompletedOrders(query);
      const [res, data] = [{ status: 200 },
      [
        {
          orderId: "o1",
          orderStatus: "Served",
          placedTime: "2021-09-01 00:00:00",
          branchId: "b1",
          totalAmount: "1200"
        },
        {
          orderId: "o2",
          orderStatus: "Served",
          placedTime: "2021-09-06 00:00:00",
          branchId: "b2",
          totalAmount: "300"
        },
        {
          orderId: "o3",
          orderStatus: "Served",
          placedTime: "2021-09-11 00:00:00",
          branchId: "b1",
          totalAmount: "4200"
        },
        {
          orderId: "o4",
          orderStatus: "Served",
          placedTime: "2021-09-16 00:00:00",
          branchId: "b2",
          totalAmount: "6600"
        },
        ,
        {
          orderId: "o5",
          orderStatus: "Served",
          placedTime: "2021-09-21 00:00:00",
          branchId: "b1",
          totalAmount: "1200"
        },
        ,
        {
          orderId: "o6",
          orderStatus: "Served",
          placedTime: "2021-09-26 00:00:00",
          branchId: "b2",
          totalAmount: "8700"
        },
        ,
        {
          orderId: "o7",
          orderStatus: "Served",
          placedTime: "2021-09-27 00:00:00",
          branchId: "b1",
          totalAmount: "6700"
        },
        ,
        {
          orderId: "o8",
          orderStatus: "Served",
          placedTime: "2021-09-27 04:00:00",
          branchId: "b2",
          totalAmount: "500"
        },
        ,
        {
          orderId: "o9",
          orderStatus: "Served",
          placedTime: "2021-09-27 08:00:00",
          branchId: "b1",
          totalAmount: "4500"
        },
        ,
        {
          orderId: "o10",
          orderStatus: "Served",
          placedTime: "2021-09-27 12:12:00",
          branchId: "b2",
          totalAmount: "4500"
        },
        {
          orderId: "o11",
          orderStatus: "Served",
          placedTime: "2021-09-27 16:00:00",
          branchId: "b1",
          totalAmount: "3200"
        },
        {
          orderId: "o12",
          orderStatus: "Served",
          placedTime: "2021-09-27 20:00:00",
          branchId: "b2",
          totalAmount: "3200"
        },
        {
          orderId: "o13",
          orderStatus: "Served",
          placedTime: "2021-09-27 23:00:00",
          branchId: "b1",
          totalAmount: "2500"
        },
        {
          orderId: "o14",
          orderStatus: "Served",
          placedTime: "2021-09-27 13:00:00",
          branchId: "b2",
          totalAmount: "2500"
        },
        {
          orderId: "o15",
          orderStatus: "Served",
          placedTime: "2021-09-06 00:00:00",
          branchId: "b1",
          totalAmount: "8500"
        },
        {
          orderId: "o16",
          orderStatus: "Served",
          placedTime: "2021-09-16 00:00:00",
          branchId: "b2",
          totalAmount: "5600"
        },
        {
          orderId: "o17",
          orderStatus: "Served",
          placedTime: "2021-09-26 00:00:00",
          branchId: "b1",
          totalAmount: "400"
        },
        {
          orderId: "o18",
          orderStatus: "Served",
          placedTime: "2021-09-1 00:00:00",
          branchId: "b2",
          totalAmount: "800"
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setMonthlyCompletedOrders(data));
      }
      return res;
    }
  }

}
