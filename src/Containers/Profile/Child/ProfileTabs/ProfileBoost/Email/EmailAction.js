import * as types from "./EmailActionTypes";
import { base_url } from "../../../../../../Config/Auth";
import axios from "axios";
import{handleEmailProfileModal} from "../../../../ProfileAction";
//import { handleEmailModal } from "../../../../../Profile/ProfileAction";
//Add Email
export const addEmailCredentials = (credentials) => (dispatch) => {
  dispatch({
    type: types.ADD_EMAIL_CREDENTIAL_REQUEST,
  });
  axios
    .post(`${base_url}/employee/user/email-credentials` , {
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
      dispatch(handleEmailProfileModal(false));
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
    .put(`${base_url}`, credentials, {
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
      dispatch(handleEmailProfileModal(false));
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

export const updateEmailDefault = (credentials) => (dispatch) => {
  dispatch({
    type: types.UPDATE_EMAIL_DEFAULT_REQUEST,
  });
  axios
    .put(`${base_url}/employee/email-credentials/user/default`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMAIL_DEFAULT_SUCCESS,
        payload: res.data,
      });
      dispatch(handleEmailProfileModal(false));
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMAIL_DEFAULT_FAILURE,
        payload: err,
      });
      // dispatch(handleEmailModal(false));
    });
};

// export const linkEmailStatus = (data, candidateId) => (
//   dispatch,
//   getState
// ) => {
//   // debugger;
//   //const { userId } = getState("auth").auth.userDetails;
//   dispatch({
//     type: types.LINK_EMAIL_STATUS_REQUEST,
//   });
//   axios
//     .put(`${base_url}/employee/email-credentials/user/default`, data, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       dispatch(getEmailProfileCredentials());
//       dispatch({
//         type: types.LINK_EMAIL_STATUS_SUCCESS,
//         payload: res.data,
//       });
//       // cb && cb("success");
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.LINK_EMAIL_STATUS_FAILURE,
//         payload: err,
//       });
//       // cb && cb("failuer");
//     });
// };
