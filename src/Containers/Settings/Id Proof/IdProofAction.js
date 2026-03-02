import * as types from "./IdProofActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the DESIGNATIONS
 */
 export const getIdProofs = () => (dispatch) => {
    dispatch({
      type: types.GET_ID_PROOF_REQUEST,
    });
    axios               
      .get(`${base_url}/idProofType/all-list`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ID_PROOF_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ID_PROOF_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new DESIGNATIONS
 */
export const addIdProofs = (idProofs, cb) => (dispatch) => {
    console.log(idProofs);
    dispatch({
      type: types.ADD_ID_PROOF_REQUEST,
    });
    axios
      .post(`${base_url}/idProofType`, idProofs, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_ID_PROOF_SUCCESS,
          payload: { ...idProofs, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ID_PROOF_FAILURE,
        });  
        cb();      
      });
  };


 export const updateIdProofs = (IdProofTypeId, IdProofType, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_ID_PROOF_REQUEST,
    });
    axios
      .put(
        `${base_url}/idProofType/update`,
        { IdProofType,IdProofTypeId,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_ID_PROOF_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ID_PROOF_FAILURE,
        });
      });
  };

