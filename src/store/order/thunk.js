import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setMonthlyCompletedOrders,
} from "./index";

export default class orderThunk {

  /**
   * --------------------Getters----------------------------------------
   */
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
          order_id: "o1",
          order_status: "served",
          placed_time: "2021-09-01 00:00:00",
          total_amount: "1200"
        },
        {
          order_id: "o2",
          order_status: "served",
          placed_time: "2021-09-06 00:00:00",
          total_amount: "300"
        },
        {
          order_id: "o3",
          order_status: "served",
          placed_time: "2021-09-11 00:00:00",
          total_amount: "4200"
        },
        {
          order_id: "o4",
          order_status: "served",
          placed_time: "2021-09-16 00:00:00",
          total_amount: "6600"
        },
        ,
        {
          order_id: "o5",
          order_status: "served",
          placed_time: "2021-09-21 00:00:00",
          total_amount: "1200"
        },
        ,
        {
          order_id: "o6",
          order_status: "served",
          placed_time: "2021-09-26 00:00:00",
          total_amount: "8700"
        },
        ,
        {
          order_id: "o7",
          order_status: "served",
          placed_time: "2021-09-21 00:00:00",
          total_amount: "6700"
        },
        ,
        {
          order_id: "o8",
          order_status: "served",
          placed_time: "2021-09-21 04:00:00",
          total_amount: "500"
        },
        ,
        {
          order_id: "o9",
          order_status: "served",
          placed_time: "2021-09-21 08:00:00",
          total_amount: "4500"
        },
        ,
        {
          order_id: "o10",
          order_status: "served",
          placed_time: "2021-09-21 12:12:00",
          total_amount: "4500"
        },
        {
          order_id: "o11",
          order_status: "served",
          placed_time: "2021-09-21 16:00:00",
          total_amount: "3200"
        },
        {
          order_id: "o12",
          order_status: "served",
          placed_time: "2021-09-21 20:00:00",
          total_amount: "3200"
        },
        {
          order_id: "o13",
          order_status: "served",
          placed_time: "2021-09-21 23:00:00",
          total_amount: "2500"
        },
        {
          order_id: "o14",
          order_status: "served",
          placed_time: "2021-09-21 13:00:00",
          total_amount: "2500"
        },
        {
          order_id: "o15",
          order_status: "served",
          placed_time: "2021-09-06 00:00:00",
          total_amount: "8500"
        },
        {
          order_id: "o16",
          order_status: "served",
          placed_time: "2021-09-16 00:00:00",
          total_amount: "5600"
        },
        {
          order_id: "o17",
          order_status: "served",
          placed_time: "2021-09-26 00:00:00",
          total_amount: "400"
        },
        {
          order_id: "o18",
          order_status: "served",
          placed_time: "2021-09-1 00:00:00",
          total_amount: "800"
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
