import * as types from "./EmailActionTypes";
import { base_url } from "../../../../Config/Auth";
import axios from "axios";
import { handleEmailModal } from "../../../Settings/SettingsAction";
//Add Email
export const addEmailCredentials = (credentials) => (dispatch) => {
  dispatch({
    type: types.ADD_EMAIL_CREDENTIAL_REQUEST,
  });
  axios
    .post(`${base_url}/employee/user/email-credentials`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEmailCredentials());
      console.log(res);
      dispatch(getEmailCredentials());
      dispatch({
        type: types.ADD_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
      //   dispatch(handleIntegrationModal(false));
      dispatch(handleEmailModal(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMAIL_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};
// const dummyData = { email: "123@gmail.com", host: "789", id: "1" };
export const getEmailCredentials = () => (dispatch) => {
  dispatch({
    type: types.GET_EMAIL_CREDENTIAL_REQUEST,
  });
  axios
    .get(`${base_url}/employee/email-credentials/user`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMAIL_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};

export const updateEmailCredentials = (credentials) => (dispatch) => {
  dispatch({
    type: types.UPDATE_EMAIL_CREDENTIAL_REQUEST,
  });
  axios
    .put(`${base_url}/employee/email-credentials`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
      dispatch(handleEmailModal(false));
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMAIL_CREDENTIAL_FAILURE,
        payload: err,
      });
      // dispatch(handleEmailModal(false));
    });
};
