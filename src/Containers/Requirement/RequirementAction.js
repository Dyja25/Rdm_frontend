import * as types from "./RequirementActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";


export const setRequirementViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_REQUIREMENT_VIEW_TYPE,
      payload: viewType,
    });
  };

 

  export const getRequirementRecord = () => (dispatch) => {
    dispatch({
      type: types.GET_REQUIREMENT_RECORD_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/count`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },   
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REQUIREMENT_RECORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REQUIREMENT_RECORD_FAILURE,
          payload: err,
        });
      });
  };



  export const getAllRequirementTable = (orgId,pageNo) => (dispatch) => {
    dispatch({ type: types.GET_ALL_REQUIREMENT_TABLE_REQUEST });
  
    axios
      .get(`${base_url}/link/recruitment/all/recruitment/${orgId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        // dispatch(getDeliveryUser());
        console.log(res);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_SUCCESS ,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_FAILURE ,
        });
      });
  };


  export const inputJobOrderSearch = (jobOrder) => (dispatch,getState) => {
    const recruiterId = getState().auth.userDetails.userId; 
    dispatch({
      type: types.INPUT_JOB_ORDER_SEARCH_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/opportunity/jobOrderName/${jobOrder}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
          //dispatch(getRecruiterRequiremnt(recruiterId));
        dispatch({
          type: types.INPUT_JOB_ORDER_SEARCH_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.INPUT_JOB_ORDER_SEARCH_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const emptyRequirement = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_REQUIREMENT_TABLE,
      
    });
  };