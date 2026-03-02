import * as types from "./DocumentsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the documents
 */
 export const getDocuments = () => (dispatch) => {
    dispatch({
      type: types.GET_DOCUMENTS_REQUEST,
    });
    axios
      .get(`${base_url}/document`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new document
 */
export const addDocuments = (documents, cb) => (dispatch) => {
    console.log(documents);
    dispatch({
      type: types.ADD_DOCUMENTS_REQUEST,
    });
    axios
      .post(`${base_url}/document`, documents, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_DOCUMENTS_SUCCESS,
          payload: { 
            ...documents, 
            // leadDocumentId: res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DOCUMENTS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new document
 */
export const removeDocuments = (cb) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_DOCUMENTS_REQUEST,
    });
    axios
      .delete(`${base_url}/document`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.REMOVE_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_DOCUMENTS_FAILURE,
        });
      });
  };
  


/**
 *update label of document
 */
 export const updateDocuments = (documentTypeId, documentTypeName, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DOCUMENTS_REQUEST,
    });
    axios
      .put(
        `${base_url}/document`,
        { documentTypeName,documentTypeId,editInd:"true"
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
          type: types.UPDATE_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DOCUMENTS_FAILURE,
        });
      });
  };

