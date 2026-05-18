import * as types from "./AuthTypes";
// import { SET_FISCAL_TIME_INTERVAL } from "../Dashboard/DashBoardActionTypes";
import { base_url, login_url } from "../../Config/Auth";
import axios from "axios";
import { message, notification } from "antd";
import dayjs from "dayjs";

import {
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_FAILURE,
} from "./AuthTypes";
 import { SET_FISCAL_TIME_INTERVAL_REPORT } from "../Reports/ReportActionType";
// import { SET_FISCAL_TIME_INTERVAL_TEAM } from "../Teams/TeamsActionTypes";
// import { SET_FISCAL_TIME_INTERVAL_VIEWPORT } from "../Viewport/ViewportActionTypes";

export const updateUserAddress = (userId, address) => (dispatch) => {
  console.log(userId, address);
  // dispatch(getUserDetails(token));
  dispatch({
    type: types.UPDATE_USER_ADDRESS,
    payload: {
      userId,
      address,
    },
  });
};

/**
 * toggle url to local or server
 */
export const toggleServer = (server) => (dispatch) => {
  dispatch({
    type: types.TOGGLE_SERVER,
    payload: server,
  });
};
/**
 * user registration goes here, any person can register .
 * after registration success the person will get an email to activate his/her account
 */
export const register = (user) => (dispatch) => {
  console.log(user);
  dispatch({
    type: types.REGISTER_REQUEST,
  });

  axios
    .post(`${base_url}/registration`, { ...user })
    .then((res) => {
      console.log(res);
      if (res.data.emailInd === true) {
        message.error("Account cannot be created using this user name");
        dispatch({
          type: types.REGISTER_FAILURE,
        });
      } else {
        message.success(
          "Thank you for registering on Korero, Success in closing Opportunities."
        );
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      message.error("Something went wrong!");
      dispatch({
        type: types.REGISTER_FAILURE,
      });
    });
};

/**
 * Email validation goes here
 * this method is a called when user click on the email activation link
 * this method verify the email and if user is verified it send them to set Password page
 */
export const validateEmail = (
  employeeId,
  token,
  emailId,
  organizationId,
  navigate
) => (dispatch) => {
  console.log(employeeId, token, emailId, organizationId);
  dispatch({
    type: types.VALIDATE_EMAIL_REQUEST,
  });

  axios
    .post(`${base_url}/emailValidation`, {
      empId: employeeId,
      token: token,
      emailId: emailId,

      organizationId: organizationId,
    })
    .then((res) => {
      console.log(res);
      if (res.data === true) {
        console.log("email is valid");
        message.success("Your email has been validated successfully.");
        navigate({
          pathname: "/setPassword",
          state: {
            employeeId: employeeId,
            emailId: emailId,
            organizationId: organizationId,
            token: token,
          },
        });
        // dispatch({
        //     type: types.VALIDATE_EMAIL_SUCCESS,
        // })
      }
    })
    .catch((err) => {
      console.log(err);
      // dispatch({
      //     type: types.VALIDATE_EMAIL_FAILURE
      // })
    });
};
/**
 * reset password
 * this method is a called when user click on the forgot password link
 * this method verify the email and if user is verified it send them to set Password page
 */
export const resetPassword = (
  userId,
  employeeId,
  token,
  emailId,
  organizationId,
  navigate
) => (dispatch) => {
  console.log(userId, token, emailId, organizationId);

  axios
    .post(`${base_url}/emailValidation`, {
      employeeId: employeeId,
      emailId: emailId,
      token: token,
      organizationId: organizationId,
    })
    .then((res) => {
      console.log(res);
      if (res.data === true) {
        navigate({
          pathname: "/setPassword",
          state: {
            employeeId: employeeId,
            emailId: emailId,
            organizationId: organizationId,
            token: token,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * Set Password goes here
 * password is set here and after password set it redirect to login page
 */
export const setPassword = (
  employeeId,
  organizationId,
  emailId,
  password,
  navigate
) => (dispatch) => {
  console.log(employeeId, organizationId, emailId, password);
  axios
    .post(`${base_url}/setPassword`, {
      employeeId: employeeId,
      organizationId: organizationId,
      emailId: emailId,
      password: password,
    })
    .then((res) => {
      console.log(res);
      if (res.data === true) {
        message.success("Your password has been saved successfully.");
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * change Password goes here
 *change your existing password with a new password
 */
export const changePassword = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
  axios
    .post(`${base_url}/changePassword`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: types.CHANGE_PASSWORD_SUCCESS });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.CHANGE_PASSWORD_FAILURE });
      cb();
    });
};

/**
 * forgot Password goes here
 * password is set here and after password set it redirect to login page
 */
export const forgotPassword = (email) => (dispatch) => {
  axios
    .get(`${base_url}/forgotPassword?email=${email}`, email)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * login request with username(email) and password
 * after successfull login it store the recieved token to local storage sends to dashboard
 */
export const login = ({ userName, password }, navigate, cb) => (dispatch) => {
  dispatch({
    type: types.LOGIN_REQUEST,
  });
  axios
    .post(`${login_url}/token/generate-token`, {
      username: userName,
      password: password,
    })
    .then((res) => {
      // message.success('Welcome to FokusWork, great to have you here.')
      console.log(res);
      sessionStorage.setItem("token", res.data.token);

      dispatch(getUserDetails(res.data.token));

      navigate("/dashboard");
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err && err.response && err.response.data);
      cb && cb("failure");

      if (
        err &&
        err.response &&
        err.response.data ===
        "You have entered an invalid username or password "
      ) {
        message.error("You have entered an invalid username or password ");
      } else {
        message.error(err.response.data);
        console.log(err);
        navigate({
          pathname: "/",
        });
      }
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: err,
      });
    });
};

export const getCurrency = () => (dispatch) => {
  dispatch({
    type: types.GET_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url}/currencies`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

export const getTimeZone = () => (dispatch) => {
  dispatch({
    type: types.GET_TIMEZONE_REQUEST,
  });
  axios
    .get(`${base_url}/timezones`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TIMEZONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TIMEZONE_FAILURE,
        payload: err,
      });
    });
};

export const getCountries = () => (dispatch) => {
  dispatch({
    type: types.GET_COUNTRIES_REQUEST,
  });
  axios
    .get(`${base_url}/countries`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COUNTRIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COUNTRIES_FAILURE,
        payload: err,
      });
    });
};
/**

 * get user details after login
 */
export const getUserDetails = (token,navigate) => (dispatch) => {
  dispatch({
    type: types.GET_USER_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/employee/profile`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem("userDetails", JSON.stringify(res.data));
      dispatch({
        type: types.GET_USER_DETAILS_SUCCESS,
        payload: res.data,
      });

      dispatch(setFiscalTimeIntervalReport(res.data));
      // dispatch(setFiscalTimeIntervalTeam(res.data));
      // dispatch(setFiscalTimeIntervalViewport(res.data));

      // dispatch(setFiscalTimeInterval(res.data));

      // dispatch(getLoginDetails(res.data.userId));
    })
    .catch((err) => {
      // message.error("Oops, something went wrong during getting user details.");
      console.log(err);
      navigate({
        pathname: "/",
      });
      dispatch({
        type: types.GET_USER_DETAILS_FAILURE,
        payload: err,
      });
    });
};
// export const setFiscalTimeInterval = (data) => (dispatch) => {
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL,
//     payload: data,
//   });
// };
export const setFiscalTimeIntervalReport = (data) => (dispatch) => {
  dispatch({
    type: SET_FISCAL_TIME_INTERVAL_REPORT,
    payload: data,
  });
};

// export const setFiscalTimeIntervalTeam = (data) => (dispatch) => {
//   //////////debugger;
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL_TEAM,
//     payload: data,
//   });
// };
// export const setFiscalTimeIntervalViewport = (data) => (dispatch) => {
//   //////////debugger;
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL_VIEWPORT,
//     payload: data,
//   });
// };
/**
 * update contact address
 * @param {string} userId
 * @param {address object} address
 */

/**
 * get user details after login
 */
export const getOrganizationDetails = (token) => (dispatch) => {
  dispatch({
    type: types.GET_ORGANIZATION_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/organization`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANIZATION_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANIZATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};

/**
 * update user details after login
 */
/**
 * update user details after login
 */
export const updateOrganizationDetails = (organizationId, data, cb) => (
  dispatch
) => {
  console.log(data);
  console.log(organizationId);
  dispatch({
    type: types.UPDATE_ORGANIZATION_DETAILS_REQUEST,
  });
  axios
    .put(
      `${base_url}/organization`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      // ////////debugger,
      console.log(userDetails);
      let newUserDetails = {
        ...userDetails,
        metaData: { ...userDetails.metaData, organization: res.data },
      };

      sessionStorage.setItem("userDetails", JSON.stringify(newUserDetails));
      dispatch({
        type: UPDATE_USER_DETAILS_SUCCESS, payload: {
          ...userDetails,
          metaData: { ...userDetails.metaData, organization: res.data },
        }
      });
      dispatch({
        type: types.UPDATE_ORGANIZATION_DETAILS_SUCCESS,
        payload: res.data,
      });
      // dispatch(getUserDetails());
      // dispatch({
      //   type: types.UPDATE_USER_BY_ID_SUCCESS,
      //   payload: {...userDetails,orgImageId:res.data.userDetails.orgImageId},
      // });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORGANIZATION_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * update oraganization subscription type STARTER/PROFESSIONAL
 */
export const updateSubscriptionType = (subscriptionType) => (dispatch) =>
  dispatch({ type: types.UPDATE_SUBSCRIPTION_TYPE, payload: subscriptionType });

/**
 * get last login detail
 */
export const getLoginDetails = (userId) => (dispatch) => {
  axios
    .get(`${base_url}/loginDetails/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      notification.open({
        placement: "bottomRight",
        message: "Welcome to Korero, great to have you here.",
        description:
          "Last logged on " +
          dayjs(res.data && res.data[1] && res.data[1].loginDate).format(
            "LLL"
          ),
        style: {
          // backgroundColor: '#1890ff',
          // color: '#fff',
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    })
    .catch((err) => console.log(err));
};
/**
 * logout the user
 * clear token from sessionStorage
 * redirect to login
 */
export const logout = (navigate) => (dispatch) => {
  window.sessionStorage.clear();
  navigate("/login");
  dispatch({ type: types.LOGOUT });
  message.success("You have successfully logged out. See you soon.");
};

export const updateUserById = (data, userId, cb) => (dispatch, getState) => {
  console.log(data);
  const { userId } = getState().auth.userDetails;
  // if (employeeId === userId) {
  //   //debugger
  //   dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
  // }
  dispatch({ type: types.UPDATE_USER_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/employee/${userId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (userId === userId) {
        dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: res.data });
        sessionStorage.setItem("userDetails", JSON.stringify(res.data));
      }
      dispatch({
        type: types.UPDATE_USER_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      // if (employeeId === userId) {
      // dispatch({ type: UPDATE_USER_DETAILS_FAILURE });
      // }
      dispatch({
        type: types.UPDATE_USER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * get topics of interest by contactId
 */
export const getTopicsByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TOPICS_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/topic/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * add topic of a userId
 */
export const addTopicByUserId = (topic) => (dispatch) => {
  console.log(topic);
  dispatch({
    type: types.ADD_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/topic`, topic, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_SUCCESS,
        payload: { ...topic, topicId: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get topics of interest by userId
 */
export const deleteTopicByUserId = (topicId, userId) => (dispatch) => {
  dispatch({
    type: types.DELETE_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/topic/${topicId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getCallsListByUserId = (userId) => (dispatch) => {
  console.log(userId);
  dispatch({
    type: types.GET_CALLS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/call/employee/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CALLS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CALLS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get task list by userId
 */
export const getTasksListByUserId = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_TASKS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/task/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get event list by userId
 */
export const getEventsListByUserId = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_EVENTS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/event/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EVENTS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EVENTS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getLeavesByUserId = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_LEAVES_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/leaves/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAVES_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEAVES_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const addOrganizationSignatureByOrgId = (data) => (
  dispatch,
  getState
) => {
  const { organizationId } = getState().auth.userDetails;
  dispatch({
    type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST,
  });
  axios
    .put(`${base_url}/organization/signature`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getOrganizationSignatureByOrgId(organizationId));
      dispatch({
        type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE,
        payload: err,
      });
    });
};

export const getOrganizationSignatureByOrgId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST,
  });
  axios
    .get(`${base_url}/organization/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE,
        payload: err,
      });
    });
};

export const addPersonalSignatureByUserId = (data) => (dispatch, getState) => {
  const { userId } = getState().auth.userDetails;
  dispatch({
    type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST,
  });
  axios
    .put(`${base_url}/user/signature`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPersonalSignatureByUserId(userId));
      dispatch({
        type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getPersonalSignatureByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/user/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const generateOtpByEmail = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.GENERATE_OTP_BY_EMAIL_REQUEST });
  axios
    .post(`${login_url}/api/otp/generateOTP`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_OTP_BY_EMAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.GENERATE_OTP_BY_EMAIL_FAILURE });
    });
};

export const getTasksListByAdmin = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_TASKS_LIST_BY_ADMIN_REQUEST,
  });
  axios
    .get(`${base_url}/task/admin/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_LIST_BY_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_LIST_BY_ADMIN_FAILURE,
        payload: err,
      });
    });
};

export const validateOtp = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.VALIDATE_OTP_BY_EMAIL_REQUEST });
  axios
    .post(`${base_url}/api/otp/validateOtp`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.VALIDATE_OTP_BY_EMAIL_SUCCESS,
        payload: res.data,
      });
      message.success(res.data.status)
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.VALIDATE_OTP_BY_EMAIL_FAILURE });
    });
};