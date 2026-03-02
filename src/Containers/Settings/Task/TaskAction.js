import * as types from "./TaskActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getTasks = () => (dispatch) => {
  dispatch({
    type: types.GET_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/taskType`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FAILURE,
        payload: err,
      });
    });
};

export const addTasks = (task, cb) => (dispatch) => {
  console.log(task);
  dispatch({
    type: types.ADD_TASK_REQUEST,
  });
  axios
    .post(`${base_url}/taskType`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_TASK_SUCCESS,
        payload: { ...task },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TASK_FAILURE,
      });
    });
};

export const updateTasks = (taskTypeId, taskType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_TASK_REQUEST,
  });
  axios
    .put(
      `${base_url}/taskType`,
      { taskType, taskTypeId ,editInd:"true" 
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
        type: types.UPDATE_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_FAILURE,
      });
    });
};
