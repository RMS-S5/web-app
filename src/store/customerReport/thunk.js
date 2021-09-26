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
      //const [res, data] = await api.customerReport.get.allCustomerReports(query);
      const [res, data] = [{ status: 200 },
      [
        {
          id: "cr1",
          description: "bad taste",
          customer_name: "Saduni",
          mobile_number: "01772665167",
          user_id: "u1",
        },
        {
          id: "cr2",
          description: "bad smell",
          customer_name: "Sandun",
          mobile_number: "01712341167",
          user_id: "u2",
        },
      ]
      ] //todo:remove mock
      if (res.status === 200) {
        dispatch(setCustomerReports(data));
      }
      return res;
    }
  }

  

}
