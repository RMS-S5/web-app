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
  booking: {
    get: {
      async previousBookings(query) {
        return ajaxResolver(
          axios.get(`/booking/get-previous-bookings/${query}`)
        );
      },
    },
  },
  roomType: {
    get: {
      async allRoomTypes(query) {
        return ajaxResolver(
          axios.get(`/roomTypes/get-roomtypes`, { params: query })
        );
      },
    },
    get: {
      async checkRoomsAvailability(query) {
        return ajaxResolver(
          axios.get(`/roomTypes/check-availability`, { params: query })
        );
      },
    },
  },
};
