import * as types from "./ExpenseActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getExpenses = () => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_REQUEST,
  });
  axios
    .get(`${base_url}/expenseType`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_FAILURE,
        payload: err,
      });
    });
};

export const addExpenses = (expense, cb) => (dispatch) => {
  console.log(expense);
  dispatch({
    type: types.ADD_EXPENSE_REQUEST,
  });
  axios
    .post(`${base_url}/expenseType`, expense, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_EXPENSE_SUCCESS,
        payload: { ...expense },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXPENSE_FAILURE,
      });
    });
};

export const updateExpenses = (expenseTypeId, expenseType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EXPENSE_REQUEST,
  });
  axios
    .put(
      `${base_url}/expenseType`,
      { expenseType, expenseTypeId ,editInd:"true"},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EXPENSE_FAILURE,
      });
    });
};
