import * as types from "./MileageActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";

export const handleMileageModal = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_MILEAGE_MODAL, payload: modalProps });
};

/**
 * Adding Mileage
 */

export const addMileage = (mileage, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_MILEAGE_REQUEST,
  });

  axios
    .post(`${base_url}/mileage`, mileage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_MILEAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MILEAGE_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

/**Fetch an mileage voucher by userId
 */
export const getMileageByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_MILEAGE_BY_USER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/voucher/mileage/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MILEAGE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const getMileageByVoucherId = (voucherId) => (dispatch) => {
  dispatch({
    type: types.GET_MILEAGE_BY_VOUCHER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/mileage/voucher/${voucherId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MILEAGE_BY_VOUCHER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_BY_VOUCHER_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateMileageModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_MILEAGE_MODAL,
    payload: modalProps,
  });
};

export const setEditMileage = (name) => (dispatch) => {
  dispatch({
    type: types.SET_MILEAGE_EDIT,
    payload: name,
  });
};

export const updateMileage = (data, expenseId) => (dispatch) => {
  dispatch({ type: types.UPDATE_MILEAGE_REQUEST });
  axios
    .put(`${base_url}/mileage`,{data}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_MILEAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_MILEAGE_FAILURE,
        payload: err,
      });
    });
};
