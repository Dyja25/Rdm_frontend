import * as types from "./CountryActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

  export const getCountry = () => (dispatch) => {
    dispatch({
      type: types.GET_COUNTRY_REQUEST,
    });
    axios
    .get(`${base_url}/countries/list`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_COUNTRY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_COUNTRY_FAILURE,
          payload: err,
        });
      });
  };

  export const linkCountryToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_COUNTRY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/mandatory/${countryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };


  
  export const allCountryMandatory = (mandatoryInd,cb) => (dispatch) => {

    dispatch({
      type: types.ALL_COUNTRY_MANDATORY_REQUEST,
    });
    axios
    .put(`${base_url}/countries/mandatory/all/${mandatoryInd}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ALL_COUNTRY_MANDATORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ALL_COUNTRY_MANDATORY_FAILURE,
          payload: err,
        });
      })
  };

