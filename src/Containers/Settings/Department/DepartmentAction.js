import * as types from "./DepartmentActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the Department
 */
 export const getDepartments = () => (dispatch) => {
    dispatch({
      type: types.GET_DEPARTMENTS_REQUEST,
    });
    axios
      .get(`${base_url}/department`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEPARTMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DEPARTMENTS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new DEPARTMENTS
 */
export const addDepartments = (departments,cb) => (dispatch) => {
    console.log(departments);
    dispatch({
      type: types.ADD_DEPARTMENTS_REQUEST,
    });
    axios
      .post(`${base_url}/department`, departments, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getDepartments());
        console.log(res);
        dispatch({
          type: types.ADD_DEPARTMENTS_SUCCESS,
          payload: { 
            ...departments, 
            // leadDocumentId: res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DEPARTMENTS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new DEPARTMENT
 */
// export const removeDepartments = (cb) => (dispatch) => {
//     // console.log(leadDocumentsId);
//     dispatch({
//       type: types.REMOVE_DEPARTMENTS_REQUEST,
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
//           type: types.REMOVE_DEPARTMENTS_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.REMOVE_DEPARTMENTS_FAILURE,
//         });
//       });
//   };
  


/**
 *update label of DEPARTMENT
 */
 export const updateDepartments = (departmentId, departmentName,sectorId,sectorName, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DEPARTMENTS_REQUEST,
    });
    axios
      .put(
        `${base_url}/department`,
        { departmentId, departmentName,sectorId,sectorName,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_DEPARTMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DEPARTMENTS_FAILURE,
        });
      });
  };

