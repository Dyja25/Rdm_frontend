import * as types from "./EmailActionTypes";
const initialState = {
  addingEmail: false,
  addingEmailError: false,

  fetchingEmailCredential: false,
  fetchingEmailCredentialError: false,
  emailCredential: {},

  updatingEmailCredential: false,
  updatingEmailCredentialError: false,

  updatingEmailDefault: false,
  updatingEmailDefaultError: false,

 
};
export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, addingEmail: true };
    case types.ADD_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        addingEmail: false,
        //   addEmailModal: false
      };
    case types.ADD_EMAIL_CREDENTIAL_FAILURE:
      return {
        ...state,
        addingEmail: false,
        addingEmailError: true,
      };
    //get email
    case types.GET_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, fetchingEmailCredential: true };
    case types.GET_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        fetchingEmailCredential: false,
        emailCredential: action.payload,
      };
    case types.GET_EMAIL_CREDENTIAL_FAILURE:
      return {
        ...state,
        fetchingEmailCredential: false,
        fetchingEmailCredentialError: true,
      };
    case types.UPDATE_EMAIL_CREDENTIAL_REQUEST:
      return { ...state, updatingEmailCredential: true };
    case types.UPDATE_EMAIL_CREDENTIAL_SUCCESS:
      return {
        ...state,
        updatingEmailCredential: false,
        emailCredential: action.payload,
      };
    case types.UPDATE_EMAIL_DEFAULT_FAILURE:
      return {
        ...state,
        updatingEmailDefault: false,
        updatingEmailDefaultError: true,
      };
      case types.UPDATE_EMAIL_DEFAULT_REQUEST:
      return { ...state, updatingEmailDefault: true };
    case types.UPDATE_EMAIL_DEFAULT_SUCCESS:
      return {
        ...state,
        updatingEmailDefault: false,
        emailDefault: action.payload,
      };
    case types.UPDATE_EMAIL_DEFAULT_FAILURE:
      return {
        ...state,
        updatingEmailDefault: false,
        updatingEmailDefaultError: true,
      };

     

    default:
      return state;
  }
};
