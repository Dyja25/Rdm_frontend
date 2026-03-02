import * as types from "./SectorsActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingSectors: false,
    fetchingSectorsError: false,
    sectors: [],

    addingSectors: false,
    addingSectorsError: false,

    removingSectors: false,
    removingSectorsError: false,

    updatingSectors: false,
    updatingSectorsError: false,

   
};

export const sectorsReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_SECTORS_REQUEST:
    return { ...state, fetchingSectors: true };
  case types.GET_SECTORS_SUCCESS:
    return {
      ...state,
      fetchingSectors: false,
      sectors: action.payload,
    };
  case types.GET_SECTORS_FAILURE:
    return {
      ...state,
      fetchingSectors: false,
      fetchingSectorsError: true,
    };

 // add sector

 case types.ADD_SECTORS_REQUEST:
  return { ...state, addingSectors: true };
case types.ADD_SECTORS_SUCCESS:
  return {
    ...state,
    addingSectors: false,
    sectors: [...state.sectors, action.payload],
    
  };
case types.ADD_SECTORS_FAILURE:
  return {
    ...state,
    addingSectors: false,
    addingSectorsError: true,
  };

     // remove sector

     case types.REMOVE_SECTORS_REQUEST:
      return { ...state, removingSectors: true };
    case types.REMOVE_SECTORS_SUCCESS:
      return {
        ...state,
        removingSectors: false,
        sectors: state.sectors.filter(
          (item) => item.sectorId !== action.payload
      ), 
      };
    case types.REMOVE_SECTORS_FAILURE:
      return {
        ...state,
        removingSectors: false,
        removingSectorsError: true,
      };

      //   update an existing SECTOR 

      case types.UPDATE_SECTORS_REQUEST:
        return { ...state, updatingSectors: true };
      case types.UPDATE_SECTORS_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingSectors: false,
          sectors: state.sectors.map((sector) =>
            sector.sectorId === action.payload.sectorId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_SECTORS_FAILURE:
        return {
          ...state,
          updatingSectors: false,
          updatingSectorsError: true,
        };

    default:
        return state;
    }
  };