import jwtDecode from "jwt-decode";
import _ from "lodash";
import api, { registerAccessToken } from "../../api";

import {
  setRooms
} from "./index";

export default class roomThunk {

  /**
   * ------------------Add------------------------------
   */

  /**
   * Add Room
   */
  static addRoom(roomData) {
    console.log("########") //test
    console.log("roomData", roomData) //test
    console.log("########") //test
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.room.add.room(roomData);
      if (res.status === 200) {
        const [res1, data] = await api.room.get.allRooms();
        if (res1.status === 200) {
          dispatch(setRooms(data));
        }
      }
      return res;
    }
  }

  /**
   * ------------------Update------------------------------
   */
  /**
   * Update Room
   */
  static updateRoom(userId, roomData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.room.put.updateRoom(userId, roomData);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.room.get.allRooms();
        const [res1, data] = [{ status: 200 },
        [
          {
            roomNumber: "42",
            capacity: "2",
            roomType: "deluxe",
            price: "20000",
          },
          {
            roomNumber: "22",
            capacity: "3",
            roomType: "vip",
            price: "35900",
          }
        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          //console.log("dispatched##")
          dispatch(setRooms(data));
        }
      }
      return res;
    }
  }

  /**
   * --------------------Getters----------------------------------------
   */
  /**
   * Get All Rooms
   */
  static getAllRooms(query) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      const [res, data] = await api.room.get.allRooms(query);
      // const [res, data] = [{ status: 200 },
      // [
      //   {
      //     roomNumber: "42",
      //     capacity: "2",
      //     roomType: "deluxe",
      //     price: "20000",
      //   },
      //   {
      //     roomNumber: "22",
      //     capacity: "3",
      //     roomType: "vip",
      //     price: "35900",
      //   }
      // ]
      //] //todo:remove mock
      if (res.status === 200) {
        dispatch(setRooms(data));
      }
      return res;
    }
  }



  /**
   * ------------------Remove------------------------------
   */
  /**
   * Remove Room
   */
  static removeRoom(userId) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.room.remove.removeRoom(userId);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.room.get.allRooms();
        let [res1, data] = [{ status: 200 },
        [
          {
            roomNumber: "22",
            capacity: "3",
            roomType: "vip",
            price: "35900",
          }

        ]
        ] //todo:remove mock

        data = data.filter(function (obj) {
          return obj.userId !== userId;
        });//todo:remove mock

        if (res1.status === 200) {
          dispatch(setRooms(data));
        }
      }
      return res;
    }
  }



}
