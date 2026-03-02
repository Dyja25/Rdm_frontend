import * as types from "./FunctionActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getFunctions = () => (dispatch) => {
  dispatch({
    type: types.GET_FUNCTION_REQUEST,
  });
  axios
    .get(`${base_url}/function`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FUNCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FUNCTION_FAILURE,
        payload: err,
      });
    });
};

export const addFunctions = (functions, cb) => (dispatch) => {
  console.log(functions);
  dispatch({
    type: types.ADD_FUNCTION_REQUEST,
  });
  axios
    .post(`${base_url}/function`, functions ,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_FUNCTION_SUCCESS,
        payload: { ...functions },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_FUNCTION_FAILURE,
      });
    });
};

export const updateFunctions = (functionTypeId, functionType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_FUNCTION_REQUEST,
  });
  axios
    .put(
      `${base_url}/function`,
      { functionType, functionTypeId },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_FUNCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_FUNCTION_FAILURE,
      });
    });
};
