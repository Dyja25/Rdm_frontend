import * as types from "./VoIPActionTypes";
import dayjs from "dayjs";

const initialState = {
  addIntegrationModal: false,
  addVoipModal: false,
  addEmailModal: false,

  addingTwilioCredential: false,
  addingTwilioCredentialError: false,
  updatingTwilioCredential: false,
  updatingTwilioCredentialError: false,
  fetchingTwilioCredential: false,
  fetchingTwilioCredentialError: false,
  twilioCredential: [],
  setEditingEmail: {},
  setEditingVoip: {},
  callingTwilio: false,
  callingTwilioError: false,
  twilioCallResponse: {},
  messagingTwilio: false,
  messagingTwilioError: false,
  twilioMessageResponse: {},
};

export const voipReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TWILIO_CREDENTIAL_REQUEST:
      return { ...state, fetchingTwilioCredential: true };
    case types.GET_TWILIO_CREDENTIAL_SUCCESS:
      return {
        ...state,
        fetchingTwilioCredential: false,
        twilioCredential: action.payload,
      };
    case types.GET_TWILIO_CREDENTIAL_FAILURE:
      return {
        ...state,
        fetchingTwilioCredential: false,
        fetchingTwilioCredentialError: true,
      };

    case types.ADD_TWILIO_CREDENTIAL_REQUEST:
      return { ...state, addingTwilioCredential: true };
    case types.ADD_TWILIO_CREDENTIAL_SUCCESS:
      return {
        ...state,
        addingTwilioCredential: false,
        addIntegrationModal: false,
        addVoipModal: false,
      };
    case types.ADD_TWILIO_CREDENTIAL_FAILURE:
      return {
        ...state,
        addingTwilioCredential: false,
        addingTwilioCredentialError: true,
        addIntegrationModal: false,
        addVoipModal: false,
      };

    case types.UPDATE_TWILIO_CREDENTIAL_REQUEST:
      return { ...state, updatingTwilioCredential: true };
    case types.UPDATE_TWILIO_CREDENTIAL_SUCCESS:
      return {
        ...state,
        updatingTwilioCredential: false,
        twilioCredential: [action.payload],
      };
    case types.UPDATE_TWILIO_CREDENTIAL_FAILURE:
      return {
        ...state,
        updatingTwilioCredential: false,
        updatingTwilioCredentialError: true,
      };

    case types.TWILIO_CALL_REQUEST:
      return { ...state, callingTwilio: true };
    case types.TWILIO_CALL_SUCCESS:
      return {
        ...state,
        callingTwilio: false,
        twilioCallResponse: action.payload,
      };
    case types.TWILIO_CALL_FAILURE:
      return { ...state, callingTwilio: false, callingTwilioError: true };

    case types.TWILIO_MESSAGE_REQUEST:
      return { ...state, messagingTwilio: true };
    case types.TWILIO_MESSAGE_SUCCESS:
      return {
        ...state,
        messagingTwilio: false,
        twilioMessageResponse: action.payload,
      };
    case types.TWILIO_MESSAGE_FAILURE:
      return { ...state, messagingTwilio: false, messagingTwilioError: true };

    case types.HANDLE_INTEGRATION_MODAL:
      return { ...state, addIntegrationModal: action.payload };

    case types.HANDLE_VOIP_MODAL:
      return { ...state, addVoipModal: action.payload };

    case types.HANDLE_EMAIL_MODAL:
      return { ...state, addEmailModal: action.payload };
    case types.SET_EMAIL_EDIT:
      return { ...state, setEditingEmail: action.payload };
    case types.SET_VOIP_EDIT:
      return { ...state, setEditingVoip: action.payload };

    default:
      return { ...state };
  }
};
