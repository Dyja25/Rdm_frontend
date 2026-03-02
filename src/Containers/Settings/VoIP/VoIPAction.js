import * as types from "./VoIPActionTypes";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

/**
 * get twilio credentials
 */
export const getTwilioCredentials = (organizationId) => (dispatch) => {
  dispatch({
    type: types.GET_TWILIO_CREDENTIAL_REQUEST,
  });
  axios
    .get(`${base_url}/twilio/organization/${organizationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TWILIO_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TWILIO_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};

/**
 * add twilio credentials
 */
export const addTwilioCredentials = (credentials) => (dispatch, getState) => {
  const { organizationId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_TWILIO_CREDENTIAL_REQUEST,
  });
  axios
    .post(`${base_url}/twilio`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTwilioCredentials(organizationId));
      dispatch({
        type: types.ADD_TWILIO_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TWILIO_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};

/**
 * get twilio credentials
 */
export const updateTwilioCredentials = (twilioId, credentials, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_TWILIO_CREDENTIAL_REQUEST,
  });
  axios
    .put(`${base_url}/twilio/${twilioId}`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TWILIO_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
    });
  cb &&
    cb().catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TWILIO_CREDENTIAL_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * call twilio account
 */
export const callTwilio = (credentials, cb) => (dispatch) => {
  console.log(credentials);
  dispatch({
    type: types.TWILIO_CALL_REQUEST,
  });
  axios
    .post(`${base_url}/twilio/call`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.TWILIO_CALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.TWILIO_CALL_FAILURE,
        payload: err,
      });
    });
};
/**
 * send a sms/message through twilio account
 */
export const messageTwilio = (credentials, cb) => (dispatch) => {
  console.log(credentials);
  dispatch({
    type: types.TWILIO_MESSAGE_REQUEST,
  });
  axios
    .post(`${base_url}/twilio/message`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.TWILIO_MESSAGE_SUCCESS,
        payload: res.data,
      });
      cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.TWILIO_MESSAGE_FAILURE,
        payload: err,
      });
      cb("failure");
    });
};

export const getVoIP = () => (dispatch) => {
  dispatch({
    type: types.GET_VOIP_REQUEST,
  });
  axios
    .get(`${base_url}/VoIP`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_VOIP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_VOIP_FAILURE,
        payload: err,
      });
    });
};

/**
 * create VOIP request
 * superuser creates a VOIP
 */
export const addVoIP = (user) => (dispatch) => {
  console.log(user);
  dispatch({
    type: types.ADD_VOIP_REQUEST,
  });

  axios
    .post(`${base_url}/VoIP`, user, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_VOIP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_VOIP_FAILURE,
        payload: err,
      });
    });
};

/**
 * VOIP form modal action
 */

export const handleIntegrationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INTEGRATION_MODAL,
    payload: modalProps,
  });
};

export const handleVoipModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_VOIP_MODAL,
    payload: modalProps,
  });
};

export const handleEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMAIL_MODAL,
    payload: modalProps,
  });
};
export const setVoIPViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_VOIP_VIEW_TYPE, payload: viewType });
export const setEmail = (name) => (dispatch) => {
  //debugger
  dispatch({
    type: types.SET_EMAIL_EDIT,
    payload: name,
  });
};
export const setVoip = (name) => (dispatch) => {
  //debugger
  dispatch({
    type: types.SET_VOIP_EDIT,
    payload: name,
  });
};
