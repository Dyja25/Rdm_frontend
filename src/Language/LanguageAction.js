import * as types from "./LanguageActionTypes";
import { message } from "antd";
export const setLanguage = (data) => (dispatch) => {
  dispatch({ type: types.SET_LANGUAGE_REQUEST });
  dispatch({
    type: types.SET_LANGUAGE_SUCCESS,
    payload: data,
  });
  message.success(`Language preference successfully changed to ${data}.`);
};
