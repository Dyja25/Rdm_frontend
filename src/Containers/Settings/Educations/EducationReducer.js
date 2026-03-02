import * as types from "./EducationActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingEducations: false,
    fetchingEducationsError: false,
    educations: [],

    addingEducations: false,
    addingEducationsError: false,

    // removingSectors: false,
    // removingSectorsError: false,

    updatingEducations: false,
    updatingEducationsError: false,

   
};

export const educationsReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_EDUCATION_REQUEST:
    return { ...state, fetchingEducations: true };
  case types.GET_EDUCATION_SUCCESS:
    return {
      ...state,
      fetchingEducations: false,
      educations: action.payload,
    };
  case types.GET_EDUCATION_FAILURE:
    return {
      ...state,
      fetchingEducations: false,
      fetchingEducationsError: true,
    };

    case types.ADD_EDUCATION_REQUEST:
    return { ...state, addingEducations: true };
  case types.ADD_EDUCATION_SUCCESS:
    return {
      ...state,
      addingEducations: false,
      educations: [...state.educations, action.payload],
      
    };
  case types.ADD_EDUCATION_FAILURE:
    return {
      ...state,
      addingEducations: false,
      addingEducationsError: true,
    };

    case types.UPDATE_EDUCATION_REQUEST:
      return { ...state, updatingEducations: true };
    case types.UPDATE_EDUCATION_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingEducations: false,
        educations: state.educations.map((education) =>
          education.educationTypeId === action.payload.educationTypeId
            ? action.payload
            : education
        ),
      };
    case types.UPDATE_EDUCATION_FAILURE:
      return {
        ...state,
        updatingEducations: false,
        updatingEducationsError: true,
      };



    default:
        return state;
    }
  };