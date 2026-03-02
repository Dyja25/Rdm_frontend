import * as types from "./EventActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the EVENTS
 */
 export const getEvents = () => (dispatch) => {
    dispatch({
      type: types.GET_EVENTS_REQUEST,
    });
    axios               
      .get(`${base_url}/eventType`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_EVENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_EVENTS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new EVENTS
 */
export const addEvents = (event, cb) => (dispatch) => {
    console.log(event);
    dispatch({
      type: types.ADD_EVENTS_REQUEST,
    });
    axios
      .post(`${base_url}/eventType`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_EVENTS_SUCCESS,
          payload: { ...event, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_EVENTS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new EVENTS
 */
// export const removeEvents = (cb) => (dispatch) => {
//     // console.log(leadDocumentsId);
//     dispatch({
//       type: types.REMOVE_EVENTS_REQUEST,
//     });
//     axios
//       .delete(`${base_url}/documents`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.REMOVE_EVENTS_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.REMOVE_EVENTS_FAILURE,
//         });
//       });
//   };
  


/**
 *update label of EVENTS
 */
 export const updateEvents = (eventTypeId, eventType, editInd, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_EVENTS_REQUEST,
    });
    axios
      .put(
        `${base_url}/eventType`,
        { eventTypeId, eventType, editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_EVENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_EVENTS_FAILURE,
        });
      });
  };