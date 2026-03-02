import * as types from "./PublishActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";

// export const getSkillsCloud = () => (dispatch) => {
//     dispatch({
//       type: types.GET_SKILLS_CLOUD_REQUEST,
//     });
//     axios
//       .get(`${base_url}/skill/word/cloud`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.GET_SKILLS_CLOUD_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err.response);
//         dispatch({
//           type: types.GET_SKILLS_CLOUD_FAILURE,
//           payload: err,
//         });
//       });
//   };

export const setPublishViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PUBLISH_VIEW_TYPE, payload: viewType });


 /**
 * set selected time range from time interval report
 */
//   export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
//     console.log(selectedTime);
//     dispatch({
//       type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
//       payload: selectedTime,
//     });
//   };
  /**
   * set current Time  report
   */
//    export const setTimeRangeReport = (startDate, endDate) => (dispatch) => {
//     dispatch({
//       type: types.SET_TIME_INTERVAL_REPORT,
//       payload: {
//         startDate: dayjs(startDate).toISOString(),
//         endDate: dayjs(endDate).toISOString(),
//       },
//     });
//   };

//   export const getListByOrderId = () => (dispatch) => {
//     dispatch({
//       type: types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST,
//     });
//     axios
//       .get(`${base_url}/order/all-order`)
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE,
//           payload: err,
//         });
//       });
//   };
  
//   export const getDateWiseList = (endDate,startDate,recruiterId) => (dispatch) => {
//     dispatch({
//       type: types.GET_DATE_WISE_REPORT_REQUEST,
//     });
//     axios
//       .get(`${base_url}/recruit/dashbord/${recruiterId}/${startDate}/${endDate}`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         dispatch({
//           type: types.GET_DATE_WISE_REPORT_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.GET_DATE_WISE_REPORT_FAILURE,
//         });
//       });
//   };

//   export const setSelectedReportType = (type) => (dispatch) =>
//   dispatch({
//     type: types.SET_SELECTED_REPORT_TYPE,
//     payload: type,
//   });

// export const setSubSelectedReportType = (type) => (dispatch) =>
//   dispatch({
//     type: types.SET_SUB_SELECTED_REPORT_TYPE,
//     payload: type,
//   });


//   export const getDashboardTable = (userId) => (dispatch) => {
//     // let api_url = "";
//     // if (userId) {
//     //   api_url = `/sort/all/contacts/user/${userId}`;
//     // } else {
//     //   api_url = `/contacts`;
//     // }
//     dispatch({
//       type: types.GET_DASHBOARD_TABLE_REQUEST,
//     });
//     axios
//       .get(`${base_url}/opportunity/user/${userId}`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.GET_DASHBOARD_TABLE_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err.response);
//         dispatch({
//           type: types.GET_DASHBOARD_TABLE_FAILURE,
//           payload: err,
//         });
//       });
      
//   };
  export const getPublishTable = (userId) => (dispatch) => {
     dispatch({
      type: types.GET_PUBLISH_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/recruitment/publish`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.pingInd === true })
        // if (filteredData.length) {
        dispatch({
          type: types.GET_PUBLISH_TABLE_SUCCESS,
          payload: res.data,
        });
      // }
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PUBLISH_TABLE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const linkPublishStatus = (data, recruitmentId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    //const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.LINK_PUBLISH_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/recruitment/publish/ping/${recruitmentId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getPublishTable());
        dispatch({
          type: types.LINK_PUBLISH_STATUS_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_PUBLISH_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };
