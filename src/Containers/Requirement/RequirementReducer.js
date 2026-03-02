import * as types from "./RequirementActionTypes";
import dayjs from "dayjs";

const initialState = {

    type : null,
    viewType: "table",

    fetchingRequirementRecord: false,
  fetchingRequirementRecordError: false,
  requirementRecord:[],

  fetchingAllRequirementTable:false,
  fetchingAllRequirementTableError:false,
  requirementTable:[],

  
  fetchingJobOrderSearchData: false,
    fetchingJobOrderSearchDataError:false,
    // jobOrderdata:[],
};
export const requirementReducer = (state = initialState, action) => {
  switch (action.type) {
    
 case types.SET_REQUIREMENT_VIEW_TYPE:
    return { ...state, viewType: action.payload };

   
   
      case types.GET_REQUIREMENT_RECORD_REQUEST:
        return { ...state, fetchingRequirementRecord: true };
      case types.GET_REQUIREMENT_RECORD_SUCCESS:
        return { ...state, fetchingRequirementRecord: false, requirementRecord: action.payload };
      case types.GET_REQUIREMENT_RECORD_FAILURE:
        return {
          ...state,
          fetchingRequirementRecord: false,
          fetchingRequirementRecordError: true,
        }; 



        case types. GET_ALL_REQUIREMENT_TABLE_REQUEST:
          return {
            ...state,
            fetchingAllRequirementTable: true,
          };
        case types. GET_ALL_REQUIREMENT_TABLE_SUCCESS:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            requirementTable: [
              ...state.requirementTable,
              ...action.payload],
            // requirementTable: action.payload,
          };
        case types. GET_ALL_REQUIREMENT_TABLE_FAILURE:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            fetchingAllRequirementTableError: true,
          };
        

          case types.INPUT_JOB_ORDER_SEARCH_DATA_REQUEST:
            return { ...state, fetchingJobOrderSearchData: true };
          case types.INPUT_JOB_ORDER_SEARCH_DATA_SUCCESS:
            return {
              ...state,
              fetchingJobOrderSearchData: false,
              requirementTable: action.payload,
              // serachedData: action.payload,
              // recruiterRequirement: state.recruiterRequirement.map((item) => {
              //   if (item.recruitmentId === action.payload.recruitmentId) {
              //     return action.payload;
              //   } else {
              //     return item;
              //   }
              // }),
            };
          case types.INPUT_JOB_ORDER_SEARCH_DATA_FAILURE:
            return { ...state, fetchingJobOrderSearchDataError: true };


            case types.EMPTY_REQUIREMENT_TABLE:
              return { ...state, requirementTable:[] };

      default:
        return state;
    }
  };
     