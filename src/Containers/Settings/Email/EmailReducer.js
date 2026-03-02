import * as types from "./EmailActionTypes";
import dayjs from "dayjs";

const initialState = {
  addingEmailCredential: false,
  addingEmailCredentialError: false,
  addingEmail: false,
  updatingEmailCredential: false,
  updatingEmailCredentialError: false,
  fetchingEmailCredential: false,
  fetchingEmailCredentialError: false,
  emailCredential: {},

  sendingEmail: false,
  sendingEmailError: false
};
export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, fetchingEmailCredential: true };
    case types.GET_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        fetchingEmailCredential: false,
        emailCredential: action.payload
      };
    case types.GET_EMAIL_CREDENTIAL_FAILURE:
      return {
        ...state,
        fetchingEmailCredential: false,
        fetchingEmailCredentialError: true
      };

    case types.ADD_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, addingEmailCredential: true };
    case types.ADD_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        addingEmailCredential: false,
        addingEmail: true,
        addIntegrationModal: false,
        addEmailModal: false
      };
    case types.ADD_EMAIL_CREDENTIAL_FAILURE:
      return {
        ...state,
        addingEmailCredential: false,
        addingEmailCredentialError: true,
        addIntegrationModal: false,
        addEmailModal: false
      };

    case types.UPDATE_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, updatingEmailCredential: true };
    case types.UPDATE_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        updatingEmailCredential: false,
        emailCredential: action.payload
      };
    case types.UPDATE_EMAIL_CREDENTIAL_FAILURE:
      return {
        ...state,
        updatingEmailCredential: false,
        updatingEmailCredentialError: true
      };

    case types.SEND_EMAIL_REQUEST:
      return { ...state, sendingEmail: true, sendingEmailError: false };
    case types.SEND_EMAIL_SUCCESS:
      return { ...state, sendingEmail: false, sendingEmailError: false };
    case types.SEND_EMAIL_FAILURE:
      return { ...state, sendingEmail: false, sendingEmailError: true };
    default:
      return { ...state };
  }
};
