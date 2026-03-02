import * as types from "./ExpenseActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingExpenses: false,
    fetchingExpensesError: false,
    expenses: [],

    addingExpenses: false,
    addingExpensesError: false,

    // removingSectors: false,
    // removingSectorsError: false,

    updatingExpenses: false,
    updatingExpensesError: false,

   
};

export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_EXPENSE_REQUEST:
    return { ...state, fetchingExpenses: true };
  case types.GET_EXPENSE_SUCCESS:
    return {
      ...state,
      fetchingExpenses: false,
      expenses: action.payload,
    };
  case types.GET_EXPENSE_FAILURE:
    return {
      ...state,
      fetchingExpenses: false,
      fetchingExpensesError: true,
    };

    case types.ADD_EXPENSE_REQUEST:
    return { ...state, addingExpenses: true };
  case types.ADD_EXPENSE_SUCCESS:
    return {
      ...state,
      addingExpenses: false,
      expenses: [...state.expenses, action.payload],
      
    };
  case types.ADD_EXPENSE_FAILURE:
    return {
      ...state,
      addingExpenses: false,
      addingExpensesError: true,
    };

    case types.UPDATE_EXPENSE_REQUEST:
      return { ...state, updatingExpenses: true };
    case types.UPDATE_EXPENSE_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingExpenses: false,
        expenses: state.expenses.map((expense) =>
        expense.expenseTypeId === action.payload.expenseTypeId
            ? action.payload
            : expense
        ),
      };
    case types.UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        updatingExpenses: false,
        updatingExpensesError: true,
      };



    default:
        return state;
    }
  };