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
  DEFAULT_BASE_URL, DEFAULT_FILE_URL
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
  headers: { 'content-type': 'multipart/form-data' }
}

export default {
  user: {
    login: {
      async admin(email, password) {
        return ajaxResolver(
          axios.post("/user/login/admin", { email, password }),
          { fullBody: true }
        );
      },
    },

    add: {
      async admin(data) {
        return ajaxResolver(axios.post("/user/register/admin", data));
      },
    },

    get: {
      async admins(query) {
        return ajaxResolver(
          axios.get("/user/get-all-admin", { params: query })
        );
      },
      async adminProfile() {
        return ajaxResolver(axios.get("/user/get-profile"));
      }
    },

    put: {
      async changeStatus(userId, status) {
        return ajaxResolver(
          axios.put(`/user/update-status/admin/${userId}`, { status })
        );
      },
      async changeAdminPassword(data) {
        return ajaxResolver(axios.put(`/user/change-password/admin`, data));
      },
      async updateAdminProfile(profileData) {
        return ajaxResolver(
          axios.put(`/user/update-profile/admin`, profileData,formDataConfig)
        );
      }
    },
    remove: {

    },
  },

  roomType: {
    add: {
      async roomType(roomTypeData) {
        return ajaxResolver(axios.post(`/room-type/add-room-type`, roomTypeData, formDataConfig))
      },
    },
    get: {
      async allRoomTypes(query) {
        return ajaxResolver(axios.get(`/room/room-types`, { params: query }));
      },
    },
    put : {
      async updateRoomType(room_type, data) {
        return ajaxResolver(axios.put(`/room-type/update-room-type/${room_type}`, data, formDataConfig))
      }
    },
    remove : {
      async removeRoomType(room_type) {
        return ajaxResolver(axios.delete(`/room-type/remove-room-type/${room_type}`))
      }
      },
  },

  room: {
    add: {
      async room(roomData) {
        return ajaxResolver(axios.post(`/room-/add-room-`, roomData, formDataConfig))
      },
    },
    get: {
      async allRooms(query) {
        return ajaxResolver(axios.get(`/room/rooms`, { params: query }));
      },
    },
    put : {
      async updateRoom(room_number, data) {
        return ajaxResolver(axios.put(`/room-/update-room/${room_number}`, data, formDataConfig))
      }
    },
    remove : {
      async removeRoom(room_number) {
        return ajaxResolver(axios.delete(`/room-/remove-room-/${room_number}`))
      }
      },
  },

  category: {
    add: {
      async category(categoryData) {
        return ajaxResolver(axios.post(`/product/add-category`, categoryData));
      },
    },
    get: {
      async allCategories(query) {
        return ajaxResolver(axios.get(`/product/get-categories`, { params: query }));
      },
    },
    put : {
      async updateCategory(categoryId,data) {
        return ajaxResolver(axios.put(`/product/update-category/${categoryId}`, data))
      }
    },
    remove : {
      async removeCategory(categoryId) {
        return ajaxResolver(axios.delete(`/product/remove-category/${categoryId}`))
      }
    }
  },
  coupon: {
    add: {
      async coupon(couponData) {
        return ajaxResolver(axios.post(`/order/generate-coupon`, couponData));
      },
    },
    get: {
      async allCoupons(query) {
        return ajaxResolver(axios.get(`/order/get-coupons`, { params: query }));
      },
      async couponByCode(couponCode){
        return ajaxResolver(axios.get(`/order/get-coupon/${couponCode}`))
      }
    },
    put : {
      async updateCoupon(couponCode,data) {
        return ajaxResolver(axios.put(`/order/update-coupon/${couponCode}`, data))
      }
    },
    remove : {
      async removeCoupon(couponCode) {
        return ajaxResolver(axios.delete(`/order/remove-coupon/${couponCode}`))
      }
    },
  },
  order: {
    get: {
      async allOrders(query) {
        return ajaxResolver(axios.get(`/order/get-orders`, { params: query }));
      },
      async orderCounts(query) {
        return ajaxResolver(axios.get(`/order/get-order-counts`, { params: query }));
      },
    },
    put : {
      async updateOrder(orderId,data) {
        return ajaxResolver(axios.put(`/order/update-order/${orderId}`, data))
      }
    }
  },

  //manager
  staff: {
    add: {
      async staff(staffData) {
        return ajaxResolver(axios.post(`/staff/add-staff`, staffData, formDataConfig))
      },
    },
    get: {
      async allStaffm(query) {
        return ajaxResolver(axios.get(`/staff/get-all-staffm`, { params: query }));
      },
    },
    put : {
      async updateStaff(user_id, data) {
        return ajaxResolver(axios.put(`/staff/update-staff/${user_id}`, data, formDataConfig))
      }
    },
    remove : {
      async removeStaff(user_id) {
        return ajaxResolver(axios.delete(`/staff/remove-staff/${user_id}`))
      }
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
        return ajaxResolver(axios.get(`/product/get-branches`, { params: query }));
      },
    },
    put : {
      async updateBranch(id,data) {
        return ajaxResolver(axios.put(`/product/update-branch/${id}`, data))
      }
    },
    remove : {
      async removeBranch(id) {
        return ajaxResolver(axios.delete(`/product/remove-branch/${id}`))
      }
    }
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
    put : {
      async updateRole(role,data) {
        return ajaxResolver(axios.put(`/product/update-role/${role}`, data))
      }
    },
    remove : {
      async removeRole(role) {
        return ajaxResolver(axios.delete(`/product/remove-role/${role}`))
      }
    }
  },

};
