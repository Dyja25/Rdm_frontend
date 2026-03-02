import * as types from "./EducationActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getEducations = () => (dispatch) => {
  dispatch({
    type: types.GET_EDUCATION_REQUEST,
  });
  axios
    .get(`${base_url}/educationType`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EDUCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EDUCATION_FAILURE,
        payload: err,
      });
    });
};

export const addEducations = (education, cb) => (dispatch) => {
  console.log(education);
  dispatch({
    type: types.ADD_EDUCATION_REQUEST,
  });
  axios
    .post(`${base_url}/educationType`, education, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_EDUCATION_SUCCESS,
        payload: { ...education },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EDUCATION_FAILURE,
      });
    });
};

export const updateEducations = (educationTypeId, educationType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EDUCATION_REQUEST,
  });
  axios
    .put(
      `${base_url}/educationType/update`,
      { educationType, educationTypeId ,editInd:"true"
      },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EDUCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EDUCATION_FAILURE,
      });
    });
};
