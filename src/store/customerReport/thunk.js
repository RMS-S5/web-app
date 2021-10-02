import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setCustomerReports,
  setMonthlyCompletedCustomerReports,
} from "./index";

export default class customerReportThunk {

  /**
   * --------------------Getters----------------------------------------
   */

  /**
   * Get All Customer Reports
   */
  static getAllCustomerReports(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.customerReport.get.allCustomerReports(query);
      // const [res, data] = [{ status: 200 },
      // [
      //   {
      //     id: "cr1",
      //     description: "bad taste",
      //     customerName: "Saduni",
      //     mobileNumber: "01772665167",
      //     userId: "u1",
      //   },
      //   {
      //     id: "cr2",
      //     description: "bad smell",
      //     customerName: "Sandun",
      //     mobileNumber: "01712341167",
      //     userId: "u2",
      //   },
      // ]
      // ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setCustomerReports(data));
      }
      return res;
    }
  }

  

}
