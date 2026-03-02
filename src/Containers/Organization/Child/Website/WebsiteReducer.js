import * as types from "./WebsiteActionTypes";
const initialState = {

    addingWebsite: false,
    addingWebsiteError: false,

    fetchingWebsiteCredential: false,
    fetchingWebsiteCredentialError: false,
    websitesCredential: [],

};

export const websitesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_WEBSITE_CREDENTIAL_REQUEST:
          return { ...state, addingWebsite: true };
        case types.ADD_WEBSITE_CREDENTIAL_SUCCESS:
          return {
            ...state,
            addingWebsite: false,
            //   addEmailModal: false
          };
        case types.ADD_WEBSITE_CREDENTIAL_FAILURE:
          return {
            ...state,
            addingWebsite: false,
            addingWebsiteError: true,
          };

          case types.GET_WEBSITE_CREDENTIAL_REQUEST:
            return { ...state, fetchingWebsiteCredential: true };
          case types.GET_WEBSITE_CREDENTIAL_SUCCESS:
            return {
              ...state,
              fetchingWebsiteCredential: false,
              websitesCredential: action.payload,
            };
          case types.GET_WEBSITE_CREDENTIAL_FAILURE:
            return {
              ...state,
              fetchingWebsiteCredential: false,
              fetchingWebsiteCredentialError: true,
            };

    default:
      return state;
  }
};