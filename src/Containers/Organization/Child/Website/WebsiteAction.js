import { base_url } from "../../../../Config/Auth";
import * as types from "./WebsiteActionTypes";
import axios from "axios";
import { handleWebsiteModal } from "../../../Settings/SettingsAction";


export const addWebsiteCredentials = (credentials,orgId) => (dispatch) => {
    dispatch({
      type:types.ADD_WEBSITE_CREDENTIAL_REQUEST,
    });
    axios
      .post(`${base_url}/job`, credentials, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getEmailCredentials());
        console.log(res);
        //  dispatch(getWebsiteCredentials(orgId));
        dispatch({
          type: types.ADD_WEBSITE_CREDENTIAL_SUCCESS,
          payload: res.data,
        });
        //   dispatch(handleIntegrationModal(false));
        dispatch(handleWebsiteModal(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_WEBSITE_CREDENTIAL_FAILURE,
          payload: err,
        });
      });
  };

  export const getWebsiteCredentials = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_WEBSITE_CREDENTIAL_REQUEST,
    });
    axios
      .get(`${base_url}/Job/publish/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_WEBSITE_CREDENTIAL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WEBSITE_CREDENTIAL_FAILURE,
          payload: err,
        });
      });
  };