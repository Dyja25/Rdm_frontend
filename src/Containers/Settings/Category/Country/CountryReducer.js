import * as types from "./CountryActionTypes";

const initialState = {


    fetchingCountry: false,
    fetchingCountryError: false,
    country: [],

    addingCountryToggle: false,
    addingCountryToggleError: false,

    addingMandatoryCountry: false,
    addingMandatoryCountryError: false,

   
};

export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
     
    case types.GET_COUNTRY_REQUEST:
        return { ...state, fetchingCountry: true };
      case types.GET_COUNTRY_SUCCESS:
        return {
          ...state,
          fetchingCountry: false,
          country: action.payload,
        };
      case types.GET_COUNTRY_FAILURE:
        return {
          ...state,
          fetchingCountry: false,
          fetchingCountryError: true,
        };
     
        case types.LINK_COUNTRY_TOGGLE_REQUEST:
          return { ...state, addingCountryToggle: true };
        case types.LINK_COUNTRY_TOGGLE_SUCCESS:
          return {
            ...state,
            addingCountryToggle: false,
            country: state.country.map((item) => {
              if (item.countryId === action.payload.countryId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.LINK_COUNTRY_TOGGLE_FAILURE:
          return {
            ...state,
            addingCountryToggle: false,
            addingCountryToggleError: true,
          };



          case types.ALL_COUNTRY_MANDATORY_REQUEST:
            return { ...state, addingMandatoryCountry: true };
          case types.ALL_COUNTRY_MANDATORY_SUCCESS:
            return {
              ...state,
              addingMandatoryCountry: false,
              country:action.payload
              // country: state.country.map((item) => {
              //   if (item.countryId === action.payload.countryId) {
              //     return action.payload;
              //   } else {
              //     return item;
              //   }
              // }),
            };
          case types.ALL_COUNTRY_MANDATORY_FAILURE:
            return {
              ...state,
              addingMandatoryCountry: false,
              addingMandatoryCountryError: true,
            };
     
    default:
        return state;
    }
  };