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
        const [res1, data] = await api.room.get.allRoomsRooms();
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
  static updateRoom(user_id, roomData) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.room.put.updateRoom(user_id, roomData);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.room.get.allRooms();
        const [res1, data] = [{ status: 200 },
        [
          {
            room_number: "42",
            capacity: "2",
            room_type: "deluxe",
            price: "20000",
          },
          {
            room_number: "22",
            capacity: "3",
            room_type: "vip",
            price: "35900",
          }
        ]
        ] //todo:remove mock
        if (res1.status === 200) {
          console.log("dispatched##")
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
      //const [res, data] = await api.room.get.allRooms(query);
      const [res, data] = [{ status: 200 },
      [
        {
          room_number: "42",
          capacity: "2",
          room_type: "deluxe",
          price: "20000",
        },
        {
          room_number: "22",
          capacity: "3",
          room_type: "vip",
          price: "35900",
        }
      ]
      ] //todo:remove mock
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
  static removeRoom(user_id) {
    return async (dispatch, getState) => {
      registerAccessToken(getState().user.tokens.access);
      //const [res, data1] = await api.room.remove.removeRoom(user_id);
      const [res, data1] = [{ status: 200 }, []] //todo:remove mock
      if (res.status === 200) {
        //const [res1, data] = await api.room.get.allRooms();
        let [res1, data] = [{ status: 200 },
        [
          {
            room_number: "22",
            capacity: "3",
            room_type: "vip",
            price: "35900",
          }

        ]
        ] //todo:remove mock
        console.log("before")
        console.log(data)
        console.log(user_id)
        data = data.filter(function (obj) {
          return obj.user_id !== user_id;
        });//todo:remove mock
        console.log("after")
        console.log(data)
        if (res1.status === 200) {
          dispatch(setRooms(data));
        }
      }
      return res;
    }
  }



}
