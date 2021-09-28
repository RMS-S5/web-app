import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setMonthlyCompletedBookings,
  setBookings,
} from "./index";

export default class bookingThunk {

  /**
   * --------------------Getters----------------------------------------
   */

  /**
   * Get Bookings
   */
  static getAllBookings(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.staff.get.allBookings(query);
      const [res, data] = [{ status: 200 },
      [
        {
          id: "b1",
          status: "Placed",
          placedTime: "2021-09-01 00:00:00",
          branchId: "b1",
          totalAmount: "34000",
          customerId: "u1",
          customerName: "Sandun Edirimuni",
          arrival: "2021-09-02 08:08:00",
          departure: "2021-09-02 20:20:00",
        },
        {
          id: "b2",
          status: "Completed",
          placedTime: "2021-09-06 00:00:00",
          branchId: "b1",
          totalAmount: "90000",
          customerId: "u1",
          customerName: "Calvin Stafford",
          arrival: "2021-09-03 08:08:00",
          departure: "2021-09-03 20:20:00",
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setBookings(data));
      }
      return res;
    }
  }

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
          status: "Completed",
          placedTime: "2021-09-01 00:00:00",
          branchId: "b2",
          totalAmount: "34000"
        },
        {
          id: "b2",
          status: "Completed",
          placedTime: "2021-09-06 00:00:00",
          branchId: "b1",
          totalAmount: "90000"
        },
        {
          id: "b3",
          status: "Completed",
          placedTime: "2021-09-11 00:00:00",
          branchId: "b2",
          totalAmount: "43500"
        },
        {
          id: "b4",
          status: "Completed",
          placedTime: "2021-09-16 00:00:00",
          branchId: "b1",
          totalAmount: "12300"
        },
        ,
        {
          id: "b5",
          status: "Completed",
          placedTime: "2021-09-21 00:00:00",
          branchId: "b2",
          totalAmount: "76500"
        },
        ,
        {
          id: "b6",
          status: "Completed",
          placedTime: "2021-09-26 00:00:00",
          branchId: "b1",
          totalAmount: "12000"
        },
        ,
        {
          id: "b7",
          status: "Completed",
          placedTime: "2021-09-27 00:00:00",
          branchId: "b2",
          totalAmount: "32200"
        },
        ,
        {
          id: "b8",
          status: "Completed",
          placedTime: "2021-09-27 04:00:00",
          branchId: "b1",
          totalAmount: "3200"
        },
        ,
        {
          id: "b9",
          status: "Completed",
          placedTime: "2021-09-27 08:00:00",
          branchId: "b2",
          totalAmount: "9000"
        },
        ,
        {
          id: "b10",
          status: "Completed",
          placedTime: "2021-09-27 12:12:00",
          branchId: "b1",
          totalAmount: "8000"
        },
        {
          id: "b11",
          status: "Completed",
          placedTime: "2021-09-27 16:00:00",
          branchId: "b2",
          totalAmount: "54300"
        },
        {
          id: "b12",
          status: "Completed",
          placedTime: "2021-09-27 20:00:00",
          branchId: "b1",
          totalAmount: "34500"
        },
        {
          id: "b13",
          status: "Completed",
          placedTime: "2021-09-27 23:00:00",
          branchId: "b2",
          totalAmount: "54300"
        },
        {
          id: "b14",
          status: "Completed",
          placedTime: "2021-09-27 13:00:00",
          branchId: "b1",
          totalAmount: "43200"
        },
        {
          id: "b15",
          status: "Completed",
          placedTime: "2021-09-06 00:00:00",
          branchId: "b2",
          totalAmount: "32100"
        },
        {
          id: "b16",
          status: "Completed",
          placedTime: "2021-09-16 00:00:00",
          branchId: "b1",
          totalAmount: "14500"
        },
        {
          id: "b17",
          status: "Completed",
          placedTime: "2021-09-26 00:00:00",
          branchId: "b2",
          totalAmount: "12500"
        },
        {
          id: "b18",
          status: "Completed",
          placedTime: "2021-09-1 00:00:00",
          branchId: "b1",
          totalAmount: "7000"
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setMonthlyCompletedBookings(data));
      }
      return res;
    }
  }

  /**
   * ------------------Update------------------------------
   */
  /**
   * Accept Booking
   */
  static acceptBooking(id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.booking.put.acceptBooking(id);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.booking.get.allBookings();
        const [res1, data] = [{ status: 200 },
        [
          {
            id: "b1",
            status: "Accepted",
            placedTime: "2021-09-01 00:00:00",
            branchId: "b1",
            totalAmount: "34000",
            customerId: "u1",
            customerName: "Sandun Edirimuni",
            arrival: "2021-09-02 08:08:00",
            departure: "2021-09-02 20:20:00",
          },
          {
            id: "b2",
            status: "Completed",
            placedTime: "2021-09-06 00:00:00",
            branchId: "b1",
            totalAmount: "90000",
            customerId: "u1",
            customerName: "Calvin Stafford",
            arrival: "2021-09-03 08:08:00",
            departure: "2021-09-03 20:20:00",
          },
        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
          dispatch(setBookings(data));
        }
      }
      return res;
    }
  }

  /**
   * Reject Booking
   */
   static rejectBooking(id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.booking.put.rejectBooking(id);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.booking.get.allBookings();
        const [res1, data] = [{ status: 200 },
        [
          {
            id: "b1",
            status: "Rejected",
            placedTime: "2021-09-01 00:00:00",
            branchId: "b1",
            totalAmount: "34000",
            customerId: "u1",
            customerName: "Sandun Edirimuni",
            arrival: "2021-09-02 08:08:00",
            departure: "2021-09-02 20:20:00",
          },
          {
            id: "b2",
            status: "Completed",
            placedTime: "2021-09-06 00:00:00",
            branchId: "b1",
            totalAmount: "90000",
            customerId: "u1",
            customerName: "Calvin Stafford",
            arrival: "2021-09-03 08:08:00",
            departure: "2021-09-03 20:20:00",
          },
        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
          dispatch(setBookings(data));
        }
      }
      return res;
    }
  }

}
