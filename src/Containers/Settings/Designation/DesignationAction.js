import * as types from "./DesignationActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the DESIGNATIONS
 */
 export const getDesignations = () => (dispatch) => {
    dispatch({
      type: types.GET_DESIGNATIONS_REQUEST,
    });
    axios               
      .get(`${base_url}/designation`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DESIGNATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DESIGNATIONS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new DESIGNATIONS
 */
export const addDesignations = (designation, cb) => (dispatch) => {
    console.log(designation);
    dispatch({
      type: types.ADD_DESIGNATIONS_REQUEST,
    });
    axios
      .post(`${base_url}/designation`, designation, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_DESIGNATIONS_SUCCESS,
          payload: { ...designation, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DESIGNATIONS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new DESIGNATIONS
 */
// export const removeDesignations = (cb) => (dispatch) => {
//     // console.log(leadDocumentsId);
//     dispatch({
//       type: types.REMOVE_DESIGNATIONS_REQUEST,
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
//           type: types.REMOVE_DESIGNATIONS_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.REMOVE_DESIGNATIONS_FAILURE,
//         });
//       });
//   };
  


/**
 *update label of DESIGNATIONS
 */
 export const updateDesignations = (designationTypeId, designationType, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DESIGNATIONS_REQUEST,
    });
    axios
      .put(
        `${base_url}/designation`,
        { designationTypeId, designationType,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_DESIGNATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DESIGNATIONS_FAILURE,
        });
      });
  };

