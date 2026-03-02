import * as types from "./FunctionActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingFunctions: false,
    fetchingFunctionsError: false,
    functions: [],

    addingFunctions: false,
    addingFunctionsError: false,

    // removingSectors: false,
    // removingSectorsError: false,

    updatingFunctions: false,
    updatingFunctionsError: false,

   
};

export const functionsReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_FUNCTION_REQUEST:
    return { ...state, fetchingFunctions: true };
  case types.GET_FUNCTION_SUCCESS:
    return {
      ...state,
      fetchingFunctions: false,
      functions: action.payload,
    };
  case types.GET_FUNCTION_FAILURE:
    return {
      ...state,
      fetchingFunctions: false,
      fetchingFunctionsError: true,
    };

    case types.ADD_FUNCTION_REQUEST:
    return { ...state, addingFunctions: true };
  case types.ADD_FUNCTION_SUCCESS:
    return {
      ...state,
      addingFunctions: false,
      functions: [...state.functions, action.payload],
      
    };
  case types.ADD_FUNCTION_FAILURE:
    return {
      ...state,
      addingFunctions: false,
      addingFunctionssError: true,
    };

    case types.UPDATE_FUNCTION_REQUEST:
      return { ...state, updatingFunctions: true };
    case types.UPDATE_FUNCTION_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingFunctions: false,
        functions: state.functions.map((functions) =>
        functions.functionTypeId === action.payload.functionTypeId
            ? action.payload
            : functions
        ),
      };
    case types.UPDATE_FUNCTION_FAILURE:
      return {
        ...state,
        updatingFunctions: false,
        updatingFunctionsError: true,
      };



    default:
        return state;
    }
  };