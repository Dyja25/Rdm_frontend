import * as types from "./DashboardActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";

export const getSkillsCloud = () => (dispatch) => {
    dispatch({
      type: types.GET_SKILLS_CLOUD_REQUEST,
    });
    axios
      .get(`${base_url}/skill/word/cloud`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SKILLS_CLOUD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_SKILLS_CLOUD_FAILURE,
          payload: err,
        });
      });
  };

export const setDashboardViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_DASHBOARD_VIEW_TYPE, payload: viewType });


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

  export const getListByOrderId = () => (dispatch) => {
    dispatch({
      type: types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST,
    });
    axios
      .get(`${base_url}/order/all-order`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getDateWiseList = (recruiterId,endDate,startDate,) => (dispatch) => {
    dispatch({
      type: types.GET_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashbord/record/${recruiterId}?endDate=${endDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

  export const setSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SELECTED_REPORT_TYPE,
    payload: type,
  });

export const setSubSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUB_SELECTED_REPORT_TYPE,
    payload: type,
  });


  export const getDashboardTable = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open-recruitment/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getRecruiterDashboardList = (recruiterId) => (dispatch) => {
    dispatch({
      type: types.GET_RECRUITER_DASHBOARD_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_RECRUITER_DASHBOARD_LIST_FAILURE,
          payload: err,
        });
      });
      
  };
  export const getDashboardTable2 = (userId,type) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/contacts/user/${userId}`;
    // } else {
    //   api_url = `/contacts`;
    // }
    dispatch({
      type: types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${userId}?type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
        
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardCommissionTable = (recruiterId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getDashBoardCustomerChart = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/customer/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE,
          payload: err,
        });
      });
      
  };
