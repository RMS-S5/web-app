import axios from "axios";

/**
 * Setup Axios
 */

const BASE_URL_HEROKU = process.env.REACT_APP_BASE_URL_HEROKU;
const BASE_URL_LOCAL = process.env.REACT_APP_BASE_URL_LOCAL;
const FILE_URL_HEROKU = process.env.REACT_APP_FILE_URL_HEROKU;
const FILE_URL_LOCAL = process.env.REACT_APP_FILE_URL_LOCAL;

const DEFAULT_BASE_URL = BASE_URL_LOCAL;
const DEFAULT_FILE_URL = FILE_URL_LOCAL;

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
          axios.put(`/room/update-room/${roomNumber}`, roomData)
        );
      },
    },
    remove: {
      async removeRoom(room_number) {
        return ajaxResolver(axios.put(`/room/remove-room/${room_number}`));
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
    },
  },

  order: {
    get: {
      async allOrders(query) {
        return ajaxResolver(axios.get(`/order/get-orders`, { params: query }));
      },
      async orderCounts(query) {
        return ajaxResolver(
          axios.get(`/order/get-order-counts`, { params: query })
        );
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
          axios.post(`/staff/add-staff`, staffData, formDataConfig)
        );
      },
    },
    get: {
      async allStaffm(query) {
        return ajaxResolver(
          axios.get(`/staff/get-all-staffm`, { params: query })
        );
      },
    },
    put: {
      async updateStaff(user_id, data) {
        return ajaxResolver(
          axios.put(`/staff/update-staff/${user_id}`, data, formDataConfig)
        );
      },
    },
    remove: {
      async removeStaff(user_id) {
        return ajaxResolver(axios.delete(`/staff/remove-staff/${user_id}`));
      },
    },
  },

  branch: {
    add: {
      async branch(branchData) {
        return ajaxResolver(axios.post(`/product/add-branch`, branchData));
      },
    },
    get: {
      async allBranches(query) {
        return ajaxResolver(
          axios.get(`/product/get-branches`, { params: query })
        );
      },
    },
    put: {
      async updateBranch(id, data) {
        return ajaxResolver(axios.put(`/product/update-branch/${id}`, data));
      },
    },
    remove: {
      async removeBranch(id) {
        return ajaxResolver(axios.delete(`/product/remove-branch/${id}`));
      },
    },
  },

  role: {
    add: {
      async role(roleData) {
        return ajaxResolver(axios.post(`/product/add-role`, roleData));
      },
    },
    get: {
      async allRoles(query) {
        return ajaxResolver(axios.get(`/product/get-roles`, { params: query }));
      },
    },
    put: {
      async updateRole(role, data) {
        return ajaxResolver(axios.put(`/product/update-role/${role}`, data));
      },
    },
    remove: {
      async removeRole(role) {
        return ajaxResolver(axios.delete(`/product/remove-role/${role}`));
      },
    },
  },
};
