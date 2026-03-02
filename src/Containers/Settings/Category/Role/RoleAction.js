import * as types from "./RoleActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";

export const getRoles = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ROLES_REQUEST,
    });
    axios
      .get(`${base_url}/roleType/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ROLES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ROLES_FAILURE,
          payload: err,
        });
      });
  };

  export const addRoles = (roleType,cb) => (dispatch) => {
    // console.log(departments);
    dispatch({
      type: types.ADD_ROLES_REQUEST,
    });
    axios
      .post(`${base_url}/roleType`, roleType, 
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_ROLES_SUCCESS,
          payload: { 
            ...roleType, 
            // leadDocumentId: res.data 
            // userId: res.data ,
            // orgId:res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ROLES_FAILURE,
        });
        cb();
      });
  };


  export const updateRoles = (roleTypeId, roleType,departmentName,departmentId, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_ROLES_REQUEST,
    });
    axios
      .put(
        `${base_url}/roleType`,
        { roleType, roleTypeId,departmentName,departmentId,editInd:"true"
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_ROLES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ROLES_FAILURE,
        });
      });
  };



  export const removeRoles = ( roleTypeId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_ROLES_REQUEST,
    });
    axios
      .delete(`${base_url}/roleType/${roleTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Role has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_ROLES_SUCCESS,
          payload:roleTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_ROLES_FAILURE,
        });
      });
  };

  export const getTalentRoles = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_TALENT_ROLES_REQUEST,
    });
    axios
      .get(`${base_url}/roleTypeExternal/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TALENT_ROLES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_TALENT_ROLES_FAILURE,
          payload: err,
        });
      });
  };

  export const addTalentRoles = (roleType,cb) => (dispatch) => {
    // console.log(departments);
    dispatch({
      type: types.ADD_TALENT_ROLES_REQUEST,
    });
    axios
      .post(`${base_url}/roleTypeExternal`, roleType, 
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_TALENT_ROLES_SUCCESS,
          payload: { 
            ...roleType, 
            // leadDocumentId: res.data 
            // userId: res.data ,
            // orgId:res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_TALENT_ROLES_FAILURE,
        });
        cb();
      });
  };