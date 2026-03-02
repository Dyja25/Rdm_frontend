import * as types from "./SectorsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getSectors = () => (dispatch) => {
    dispatch({
      type: types.GET_SECTORS_REQUEST,
    });
    axios
    .get(`${base_url}/sector`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SECTORS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SECTORS_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addSectors = (sectors, cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_SECTORS_REQUEST,
  });
  axios
    .post(`${base_url}/sector`, sectors, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getSectors());
      message.success("Sector has been added successfully!");
      console.log(res);
      dispatch({
        type: types.ADD_SECTORS_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SECTORS_FAILURE,
      });
      cb();
    });
};


  /**
 *update label of sector
 */
 export const updateSectors = ( sectorId,sectorName,cb) => (dispatch) => {
    
  dispatch({
    type: types.UPDATE_SECTORS_REQUEST,
  });
  axios
    .put(
      `${base_url}/sector/update`,
      { sectorName,sectorId },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_SECTORS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SECTORS_FAILURE,
      });
    });
};

  export const removeSectors = ( sectorId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SECTORS_REQUEST,
    });
    axios
      .delete(`${base_url}/sector/${sectorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Sector has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SECTORS_SUCCESS,
          payload:sectorId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SECTORS_FAILURE,
        });
      });
  };
  