import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import { setCustomerBookings, setAccountLevel } from "./index";

export default class customerThunk {
  /**
   * ------------------Add------------------------------
   */

  /**
   * Add coupon
   */
  static addBooking(bookingData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.customer.add.booking(bookingData);
      if (res.status === 200) {
        const [res1, data] = await api.customer.get.allBookings();
        if (res1.status === 200) {
          dispatch(setCustomerBookings(data));
        }
      }
      return res;
    };
  }
  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All previous bookings
   */
  static getAllPreviousBookings(query) {
    console.log(query);
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.booking.get.previousBookings(query);
      if (res.status === 200) {
        dispatch(setCustomerBookings(data));
      }
      return res;
    };
  }

  //   /**
  //    * ------------------Update------------------------------
  //    */
  //   /**
  //    * Update order
  //    */
  //   static updateOrder(orderId, orderData) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data1] = await api.order.put.updateOrder(orderId, orderData);
  //       if (res.status === 200) {
  //         const [res1, data] = await api.order.get.allOrders();
  //         if (res1.status === 200) {
  //           dispatch(setOrders(data));
  //         }
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * Update coupon
  //    */
  //   static updateCoupon(couponId, couponData) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.coupon.put.updateCoupon(couponId, couponData);
  //       if (res.status === 200) {
  //         const [res1, data] = await api.coupon.get.allCoupons();
  //         if (res1.status === 200) {
  //           dispatch(setCoupons(data));
  //         }
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * --------------------Getters----------------------------------------
  //    */
  //   /**
  //    * Get All Orders
  //    */
  //   static getAllOrders(query) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.order.get.allOrders(query);
  //       if (res.status === 200) {
  //         dispatch(setOrders(data));
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * Get All Order Counts
  //    */
  //   static getOrderCounts(query) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.order.get.orderCounts(query);
  //       if (res.status === 200) {
  //         dispatch(setOrderCounts(data));
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * get all Coupons
  //    */
  //   static getAllCoupons(query) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.coupon.get.allCoupons(query);
  //       if (res.status === 200) {
  //         dispatch(setCoupons(data));
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * get all Coupons
  //    */
  //   static getAllCoupons(query) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.coupon.get.allCoupons(query);
  //       if (res.status === 200) {
  //         dispatch(setCoupons(data));
  //       }
  //       return res;
  //     }
  //   }

  //   /**
  //    * ------------------Remove------------------------------
  //    */

  //   /**
  //    * Remove coupon
  //    */
  //   static removeCoupon(couponId) {
  //     return async (dispatch, getState) => {
  //       registerAccessToken(getState().user.tokens.access);
  //       const [res, data] = await api.coupon.remove.removeCoupon(couponId);
  //       if (res.status === 200) {
  //         const [res1, data] = await api.coupon.get.allCoupons();
  //         if (res1.status === 200) {
  //           dispatch(setCoupons(data));
  //         }
  //       }
  //       return res;
  //     }
  //   }
}
