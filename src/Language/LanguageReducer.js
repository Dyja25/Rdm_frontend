import * as types from "./LanguageActionTypes";

const initialState = {
  language: "English",
  fetchingLanguage: false,
};
export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE_REQUEST:
      return { ...state, fetchingLanguage: true };
    case types.SET_LANGUAGE_SUCCESS:
      return { ...state, fetchingLanguage: false, language: action.payload };

    default:
      return state;
  }
};
