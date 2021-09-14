import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "./../../api";

import {
  setRoomTypes
} from "./index";

export default class roomTypeThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add RoomType
   */
  static addRoomType(roomTypeData) {
    console.log("########") //test
    console.log("roomTypeData",  roomTypeData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.roomType.add.roomType(roomTypeData);
      if (res.status === 200) {
        const [res1, data] = await api.roomType.get.allRoomTypes();
        if (res1.status === 200) {
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    }
  }


  /**
   * ------------------Update------------------------------
   */
  /**
   * Update RoomType
   */
  static updateRoomType(room_type, roomTypeData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.roomType.put.updateRoomType(room_type, roomTypeData);
      const [res, data1] = [{status: 200}, []] //todo:remove mock
      if (res.status === 200) {
                //const [res1, data] = await api.roomType.get.allRoomTypes();
        const [res1, data] = [{status: 200}, 
          [
            {
              room_type: "deluxe",
              description: "deluxe room"
            }, 
            {
              room_type: "vip",
              description: "vip room"
            },
            {
              room_type: "suite",
              description: "suite room"
            }
          ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    }
  }


  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Products
   */
  static getAllRoomTypes(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data] = await api.roomType.get.allRoomTypes(query);
      const [res, data] = [{status: 200}, 
        [
          {
            room_type: "deluxe",
            description: "deluxe room"
          }, 
          {
            room_type: "vip",
            description: "vip room"
          },
          {
            room_type: "suite",
            description: "suite room"
          }
        ]
    ] //todo:remove mock
      if (res.status === 200) {
          dispatch(setRoomTypes(data));
      }
      return res;
    }
  }


  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove RoomType
   */
  static removeRoomType(room_type) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.roomType.remove.removeRoomType(room_type);
      const [res, data1] = [{status: 200}, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.roomType.get.allRoomTypes();
        let [res1, data] = [{status: 200}, 
          [
            {
              room_type: "deluxe",
              description: "deluxe room"
            }, 
            {
              room_type: "vip",
              description: "vip room"
            },
            {
              room_type: "suite",
              description: "suite room"
            }
          ]
        ] //todo:remove mock

        data = data.filter(function(obj) {
          return obj.room_type !== room_type;
        });//todo:remove mock

        if (res1.status === 200) {
          dispatch(setRoomTypes(data));
        }
      }
      return res;
    }
  }


}
