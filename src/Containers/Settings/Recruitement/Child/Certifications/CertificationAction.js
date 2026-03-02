import * as types from "./CertificationActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../../Config/Auth";
import { message } from "antd";

export const getCertification = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CERTIFICATION_REQUEST,
    });
    axios               
      .get(`${base_url}/certificationsLibrary/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CERTIFICATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CERTIFICATION_FAILURE,
          payload: err,
        });
      });
  };

  export const addCertification = (certification, cb,orgId,save) => (dispatch,getState) => {
    const orgId = getState().auth.userDetails.organizationId;
    console.log(certification);
    dispatch({
      type: types.ADD_CERTIFICATION_REQUEST,
    });
    axios
      .post(`${base_url}/certificationLibrary/save `, certification, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Certification has been added successfully!");
        dispatch(getCertification(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_CERTIFICATION_SUCCESS,
          payload: { ...certification, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CERTIFICATION_FAILURE,
        });
        cb();
      });
  };

  export const removeCertification = (certificationId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_CERTIFICATION_REQUEST,
    });
    axios
      .delete(`${base_url}/delete/certificationLibrary/${certificationId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Certification has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_CERTIFICATION_SUCCESS,
          payload: certificationId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_CERTIFICATION_FAILURE,
        });
      });
  };
  
  export const updateCertification = (certificationId, name, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_CERTIFICATION_REQUEST,
    });
    axios
      .put(
        `${base_url}/update/certificationLibrary/${certificationId}`,
        { certificationId, name,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        message.success("Certification has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_CERTIFICATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_CERTIFICATION_FAILURE,
        });
      });
  };

  export const searchCertificationName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CERTIFICATION_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/certificationsLibrary/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_CERTIFICATION_SEARCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_CERTIFICATION_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

