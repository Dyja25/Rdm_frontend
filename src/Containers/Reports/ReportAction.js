import * as types from "./ReportActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
/**
 * set report viewType to me or organization
 */
export const setReportViewType = (viewType) => (dispatch) => {
  console.log(viewType);
  dispatch({
    type: types.SET_REPORT_VIEW_TYPE,
    payload: viewType,
  });
};

/**
 * set selected time range from time interval report
 */
export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
    payload: selectedTime,
  });
};

/**
 * set current Time  report
 */
export const setTimeRangeReport = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.SET_TIME_INTERVAL_REPORT,
    payload: {
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
    },
  });
};

/**
 * set which report type to be displayed eg: report/ account / opportunity
 */
export const setSelectedReportType = (type) => (dispatch) => {
  console.log(type);
  dispatch({
    type: types.SET_SELECTED_REPORT_TYPE,
    payload: type,
  });
};

export const myViewReport = (recruiterId, type, startDate, endDate) => (
  dispatch
) => {
  dispatch({ type: types.GET_MY_VIEW_REPORT_REQUEST });
  axios
    .get(`${base_url}/reports/user/${recruiterId}?endDate=${endDate}&startDate=${startDate}&type=${type}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MY_VIEW_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MY_VIEW_REPORT_FAILURE,
        payload: err,
      });
    });
};
export const getSalesReports = (userId,type,startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_SALES_REPORTS_REQUEST,
  });
  axios
    .get(`${base_url}/reports/user/sales/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SALES_REPORTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SALES_REPORTS_FAILURE,
        payload: err,
      });
    });
    
};

export const organisationReport = (
  organizationId,
  type,
  startDate,
  endDate
) => (dispatch) => {
  dispatch({ type: types.GET_ORGANISATION_REPORT_REQUEST });
  axios
    .get(
      `${base_url}/reports/organization/${organizationId}?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANISATION_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANISATION_REPORT_FAILURE,
        payload: err,
      });
    });
};
export const setSubSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUB_SELECTED_REPORT_TYPE,
    payload: type,
  });
