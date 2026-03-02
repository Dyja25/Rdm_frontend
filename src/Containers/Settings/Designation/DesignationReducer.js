import * as types from "./DesignationActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingDesignations: false,
    fetchingDesignationsError: false,
    designations: [],

    addingDesignations: false,
    addingDesignationsError: false,

    // removingDesignations: false,
    // removingDesignationsError: false,

    updatingDesignations: false,
    updatingDesignationsError: false,

   
};

export const designationsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_DESIGNATIONS_REQUEST:
        return { ...state, fetchingDesignations: true };
      case types.GET_DESIGNATIONS_SUCCESS:
        return { ...state, fetchingDesignations: false, designations: action.payload };
      case types.GET_DESIGNATIONS_FAILURE:
        return { ...state, fetchingDesignations: false, fetchingDesignationsError: true };


         /**
     * add a new document 
     */
    case types.ADD_DESIGNATIONS_REQUEST:
        return { ...state, addingDesignations: true };
      case types.ADD_DESIGNATIONS_SUCCESS:
        return {
          ...state,
          addingDesignations: false,
          designations: [...state.designations, action.payload],
        };
      case types.ADD_DESIGNATIONS_FAILURE:
        return { ...state, addingDesignations: false, addingDesignationsError: true };


         /**
     * remove an existing DESIGNATIONS
     */
    case types.REMOVE_DESIGNATIONS_REQUEST:
        return { ...state, removingDesignations: true };
      case types.REMOVE_DESIGNATIONS_SUCCESS:
        return {
          ...state,
          removingDesignations: false,
          designations: state.designations.filter(
            (designation) => designation.designationTypeId !== action.payload
          ),
        };
      case types.REMOVE_DESIGNATIONS_FAILURE:
        return { ...state, removingDesignations: false, removingDesignationsError: true };



         /**
     * update an existing DESIGNATIONS
     */
    case types.UPDATE_DESIGNATIONS_REQUEST:
        return { ...state, updatingDesignations: true };
      case types.UPDATE_DESIGNATIONS_SUCCESS:
        // return { ...state, updatingDesignations: false, Designations: [...state.Designations, action.payload] };
        return {
          ...state,
          updatingDesignations: false,
          designations: state.designations.map((designation) =>
            designation.designationTypeId === action.payload.designationTypeId
              ? action.payload
              : designation
          ),
        };
      case types.UPDATE_DESIGNATIONS_FAILURE:
        return { ...state, updatingDesignations: false, updatingDesignationsError: true };

        default:
            return state;
        }
      };
