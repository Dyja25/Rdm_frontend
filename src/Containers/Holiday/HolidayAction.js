import * as types from "./HolidayActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";

const dummydata = [
  { holidayName: "abc", date: "22-78-89", time: "optional" },
  { holidayName: "abc", date: "22-78-89", time: "optional" },
  { holidayName: "abc", date: "22-78-89", time: "optional" },
];
export const addHoliday = (data, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_HOLIDAY_REQUEST,
  });
  console.log(data);

  axios
    .post(`${base_url}/holiday`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getHolidayDetails(employeeId));
      dispatch({
        type: types.ADD_HOLIDAY_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_HOLIDAY_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};

export const getHoliday = () => (dispatch) => {
  dispatch({
    type: types.GET_HOLIDAY_REQUEST,
  });

  axios
    .get(`${base_url}/holidays`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_HOLIDAY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HOLIDAY_FAILURE,
        payload: err,
      });
    });
};

export const handleHolidayModal = (modalProps) => (dispatch) => {
  console.log(modalProps);
  dispatch({
    type: types.HANDLE_HOLIDAY_MODAL,
    payload: modalProps,
  });
};
export const updateHoliday = (
  holidayId,
  holidayName,
  date,
  holidayType,
  cb
) => (dispatch) => {
  dispatch({
    type: types.UPDATE_HOLIDAY_REQUEST,
  });
  axios
    .put(
      `${base_url}/holiday `,
      { holidayId, holidayName, date, holidayType },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_HOLIDAY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_HOLIDAY_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteHoliday = (holidayId) => (dispatch, getState) => {
  console.log("inside deleteDocument", holidayId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_HOLIDAY_REQUEST,
  });

  axios
    .delete(`${base_url}/holiday/${holidayId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_HOLIDAY_SUCCESS,
        payload: holidayId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_HOLIDAY_FAILURE,
        payload: err,
      });
    });
};
