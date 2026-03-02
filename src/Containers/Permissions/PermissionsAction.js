import * as types from "./PermissionsActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const getPermissions = (userId) => (dispath) => {
    dispath({ type: types.GET_PERMISSIONS_REQUEST });
    axios
      .get(`${base_url}/permission/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispath({
          type: types.GET_PERMISSIONS_SUCCESS,
          payload: res.data,
        });
        
      })
      .catch((err) => {
        dispath({
          type: types.GET_PERMISSIONS_FAILURE,
          payload: err,
        });
      });
  };

  export const addingPermissions = (permissions, userId) => (dispatch) => {
    console.log(permissions, userId);
    dispatch({
      type: types.ADDING_PERMISSIONS_REQUEST,
    });
    axios
      .post(`${base_url}/permission`, permissions, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
     
      .then((res) => {
        console.log(res);
        dispatch(getPermissions(userId))
        dispatch({
          type: types.ADDING_PERMISSIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADDING_PERMISSIONS_FAILURE,
          payload: err,
        });
      });
  };
  

  export const getPermissionsList = () => (dispath) => {
    dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
    axios
      .get(`${base_url}/permission/type?type=${"candidate"}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispath({
          type: types.GET_PERMISSIONS_LIST_SUCCESS,
          payload: res.data,
        });
        
      })
      .catch((err) => {
        dispath({
          type: types.GET_PERMISSIONS_LIST_FAILURE,
          payload: err,
        });
      });
  };
