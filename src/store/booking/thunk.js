import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setMonthlyCompletedBookings,
} from "./index";

export default class bookingThunk {

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get Monthly Completed Bookings
   */
  static getMonthlyCompletedBookings(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.booking.get.monthlyCompletedBookings(query);
      const [res, data] = [{ status: 200 },
      [
        {
          id: "b1",
          status: "completed",
          placed_time: "2021-09-01 00:00:00"
        },
        {
          id: "b2",
          status: "completed",
          placed_time: "2021-09-06 00:00:00"
        },
        {
          id: "b3",
          status: "completed",
          placed_time: "2021-09-11 00:00:00"
        },
        {
          id: "b4",
          status: "completed",
          placed_time: "2021-09-16 00:00:00"
        },
        ,
        {
          id: "b5",
          status: "completed",
          placed_time: "2021-09-21 00:00:00"
        },
        ,
        {
          id: "b6",
          status: "completed",
          placed_time: "2021-09-26 00:00:00"
        },
        ,
        {
          id: "b7",
          status: "completed",
          placed_time: "2021-09-21 00:00:00"
        },
        ,
        {
          id: "b8",
          status: "completed",
          placed_time: "2021-09-21 04:00:00"
        },
        ,
        {
          id: "b9",
          status: "completed",
          placed_time: "2021-09-21 08:00:00"
        },
        ,
        {
          id: "b10",
          status: "completed",
          placed_time: "2021-09-21 12:12:00"
        },
        {
          id: "b11",
          status: "completed",
          placed_time: "2021-09-21 16:00:00"
        },
        {
          id: "b12",
          status: "completed",
          placed_time: "2021-09-21 20:00:00"
        },
        {
          id: "b13",
          status: "completed",
          placed_time: "2021-09-21 23:00:00"
        },
        {
          id: "b14",
          status: "completed",
          placed_time: "2021-09-21 13:00:00"
        },
        {
          id: "b15",
          status: "completed",
          placed_time: "2021-09-06 00:00:00"
        },
        {
          id: "b16",
          status: "completed",
          placed_time: "2021-09-16 00:00:00"
        },
        {
          id: "b17",
          status: "completed",
          placed_time: "2021-09-26 00:00:00"
        },
        {
          id: "b18",
          status: "completed",
          placed_time: "2021-09-1 00:00:00"
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setMonthlyCompletedBookings(data));
      }
      return res;
    }
  }

}
