import axios from "axios";

/**
 * Setup Axios
 */

const BASE_URL_HEROKU = process.env.REACT_APP_BASE_URL_HEROKU;
const BASE_URL_LOCAL = process.env.REACT_APP_BASE_URL_LOCAL;
const FILE_URL_HEROKU = process.env.REACT_APP_FILE_URL_HEROKU;
const FILE_URL_LOCAL = process.env.REACT_APP_FILE_URL_LOCAL;

const DEFAULT_BASE_URL = BASE_URL_HEROKU;
const DEFAULT_FILE_URL = FILE_URL_HEROKU;

export const BACK_END_URL = {
  DEFAULT_BASE_URL,
  DEFAULT_FILE_URL,
};

axios.defaults.baseURL = DEFAULT_BASE_URL;

/**
 * Register Access token with axios
 * @param token
 */
export const registerAccessToken = (token) => {
  axios.defaults.headers["authorization"] = `Bearer ${token}`;
};

/**
 * Convert Axios Response into
 *      status: http status code
 *      message: message from backend api
 * @param res
 */
function readStatus(res) {
  console.log("read status res", res);
  if (!res || !res.status) {
    return {
      status: 408,
      message: "Check your internet connection",
    };
  }
  return {
    status: res.status,
    message: res.data.message,
  };
}

/**
 * Resolve Axios Response
 * @param axiosRes
 * @param options
 */
async function ajaxResolver(axiosRes, options = null) {
  try {
    const res = await axiosRes;
    console.log("Ajax Resolver Response", res);
    if (options && options.fullBody) return [readStatus(res), res.data];
    else return [readStatus(res), res.data.data];
  } catch (e) {
    const res = e.response;
    console.log("Ajax error", e);
    return [readStatus(res), null];
  }
}

/**
 * Form data config
 */
const formDataConfig = {
  headers: { "content-type": "multipart/form-data" },
};

export default {
  user: {
    add: {
      async register(data) {
        return ajaxResolver(axios.post("/user/register/customer", data));
      },
    },
    login: {
      async login(email, password) {
        return ajaxResolver(
          axios.post("/user/login/user", { email, password }),
          {
            fullBody: true,
          }
        );
      },
    },
    get: {
      async userData() {
        return ajaxResolver(axios.get("/user/get-profile"));
      },
      async customerById(data) {
        return ajaxResolver(axios.get(`/user/get-user-by-id/${data}`));
      },
    },
    update: {
      async changePassword(userId, data) {
        return ajaxResolver(axios.put(`user/update-password/${userId}`, data));
      },
      async updateProfile(userId, data) {
        return ajaxResolver(axios.put(`user/update-password/${userId}`, data));
      },
    },
  },
  report: {
    add: {
      async customerReport(reportData) {
        return ajaxResolver(axios.post(`/report/add-new-report`, reportData));
      },
      async customerReview(reportData) {
        return ajaxResolver(axios.post(`/report/add-new-review`, reportData));
      },
    },
  },
  roomType: {
    add: {
      async roomType(roomTypeData) {
        return ajaxResolver(axios.post(`/room/add-room-type`, roomTypeData));
      },
    },
    get: {
      async allRoomTypes(query) {
        return ajaxResolver(axios.get(`/room/room-types`, { params: query }));
      },
    },
    put: {
      async updateRoomType(roomType, data) {
        return ajaxResolver(axios.put(`/room/update-room-type/${roomType}`, data));
      },
    },
    remove: {
      async removeRoomType(roomType) {
        return ajaxResolver(axios.put(`/room/remove-room-type/${roomType}`));
      },
    },
  },

  room: {
    add: {
      async room(roomData) {
        return ajaxResolver(axios.post(`/room/add-room`, roomData));
      },
    },
    get: {
      async allRooms(query) {
        return ajaxResolver(axios.get(`/room/rooms`, { params: query }));
      },
    },
    put: {
      async updateRoom(roomNumber, roomData) {
        return ajaxResolver(
          axios.put(`/room/update-room/${roomNumber}`, roomData));
      },
    },
    remove: {
      async removeRoom(roomNumber) {
        return ajaxResolver(axios.put(`/room/remove-room/${roomNumber}`));
      },
    },
  },

  table: {
    add: {
      async table(tableData) {
        return ajaxResolver(axios.post(`/branch/add-table`, tableData));
      },
    },
    get: {
      async allTables(query) {
        return ajaxResolver(axios.get(`/branch/branch-tables`, { params: query }));
      },
    },
    remove: {
      async removeTable(tableNumber) {
        return ajaxResolver(axios.put(`/branch/remove-table/${tableNumber}`));
      },
    },
  },

  branch: {
    add: {
      async branch(branchData) {
        return ajaxResolver(axios.post(`/branch/add-branch`, branchData));
      },
    },
    get: {
      async allBranches(query) {
        return ajaxResolver(axios.get(`/branch/branches`, { params: query }));
      },
    },
    remove: {
      async removeBranch(branchId) {
        return ajaxResolver(axios.put(`/branch/remove-branch/${branchId}`));
      },
    },
  },

  customerReport: {
    get: {
      async allCustomerReports(query) {
        return ajaxResolver(axios.get(`/customer-report/customer-reports`));
      },
    },
  },

  category: {
    add: {
      async category(categoryData) {
        return ajaxResolver(axios.post(`/food-item/add-category`, categoryData));
      },
    },
    get: {
      async allCategories(query) {
        return ajaxResolver(axios.get(`/food-item/categories-all`, { params: query }));
      },
    },
    remove: {
      async removeCategory(categoryId) {
        return ajaxResolver(axios.delete(`/food-item/remove-category/${categoryId}`));
      },
    },
  },

  foodItem: {
    add: {
      async foodItem(foodItemData) {
        return ajaxResolver(axios.post(`/food-item/add-food-item`, foodItemData, formDataConfig));
      },
    },
    get: {
      async allFoodItems(query) {
        return ajaxResolver(axios.get(`/food-item/food-items-all`, { params: query }));
      },
    },
    put: {
      async updateFoodItem(foodItemId, foodItemData) {
        return ajaxResolver(
          axios.put(`/food-item/update-food-item/${foodItemId}`, foodItemData, formDataConfig));
      },
    },
    remove: {
      async removeFoodItem(foodItemId) {
        return ajaxResolver(axios.delete(`/food-item/remove-food-item/${foodItemId}`));
      },
    },
  },

  booking: {
    get: {
      async previousBookings(query) {
        return ajaxResolver(
          axios.get(`/booking/get-previous-bookings/${query}`)
        );
      },
      async allBookings(query) {
        return ajaxResolver(
          axios.get(`/booking/bookings`)
        );
      },
      async monthlyCompletedBookings(query) {
        return ajaxResolver(
          axios.get(`/booking/bookings-monthly-completed`)
        );
      },
    },

    put: {
      async acceptBooking(bookingId) {
        return ajaxResolver(
          axios.put(`/booking/accept-booking/${bookingId}`));
      },
      async rejectBooking(bookingId) {
        return ajaxResolver(
          axios.put(`/booking/reject-booking/${bookingId}`));
      },
    },
    add: {
      async newBooking(bookingData) {
        return ajaxResolver(
          axios.post(`/booking/add-new-booking`, bookingData)
        );
      },
    },
  },

  order: {
    get: {
      async allOrders(query) {
        return ajaxResolver(axios.get(`/order/orders`, { params: query }));
      },
      async orderCounts(query) {
        return ajaxResolver(
          axios.get(`/order/get-order-counts`, { params: query })
        );
      },
      async monthlyCompletedOrders(query) {
        return ajaxResolver(axios.get(`/order/orders-monthly-completed`, { params: query }));
      },
    },
    put: {
      async updateOrder(orderId, data) {
        return ajaxResolver(axios.put(`/order/update-order/${orderId}`, data));
      },
    },
  },

  staff: {
    add: {
      async staff(staffData) {
        return ajaxResolver(
          axios.post(`/user/register/staff-member`, staffData)
        );
      },
    },
    get: {
      async allStaffm(query) {
        return ajaxResolver(
          axios.get(`/user/staff-members`, { params: query })
        );
      },
    },
    put: {
      async updateStaff(userId, data) {
        return ajaxResolver(
          axios.put(`/user/update-staff-member/${userId}`, data)
        );
      },
      async allBrachesCustomer(query) {
        return ajaxResolver(axios.get(`/branch/get-all-branches-customer`));
      },
      async allAvailableRoomsByBranch(query) {
        return ajaxResolver(
          axios.get(`/branch/get-available-rooms-by-branch/${query}`)
        );
      },
    },
    remove: {
      async removeStaff(userId) {
        return ajaxResolver(axios.delete(`/user/remove-staff/${userId}`));
      },
    },
  },

  accountType: {
    get: {
      async allAccountTypes(query) {
        return ajaxResolver(axios.get(`/user/account-types`, { params: query }));
      },
    },
  },
};
