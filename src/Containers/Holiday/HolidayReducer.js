import * as types from "./HolidayActionTypes";
const initialState = {
  addingHoliday: false,
  addingHolidayError: false,

  fetchingHoliday: false,
  fetchingHolidayError: false,
  holidays: [],
  updatingHoliday: false,
  updatingHolidayError: false,

  addHolidayModal: false,

  deleteHoliday: false,
  deleteHolidayError: false,
};
export const holidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_HOLIDAY_REQUEST:
      return { ...state, addingHoliday: true };
    case types.ADD_HOLIDAY_SUCCESS:
      return { ...state, addingHoliday: false };
    case types.ADD_HOLIDAY_FAILURE:
      return {
        ...state,
        addingHoliday: false,
        addingHolidayError: true,
      };

    case types.GET_HOLIDAY_REQUEST:
      return { ...state, fetchingHoliday: true };
    case types.GET_HOLIDAY_SUCCESS:
      return { ...state, fetchingHoliday: false, holidays: action.payload };
    case types.GET_HOLIDAY_FAILURE:
      return {
        ...state,
        fetchingHoliday: false,
        fetchingHolidayError: true,
      };

    case types.UPDATE_HOLIDAY_REQUEST:
      return { ...state, updatingHoliday: true };
    case types.UPDATE_HOLIDAY_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingHoliday: false,
        holidays: state.holidays.map((state) =>
          state.holidayId === action.payload.holidayId ? action.payload : state
        ),
      };
    case types.UPDATE_HOLIDAY_FAILURE:
      return { ...state, updatingHoliday: false, updatingHolidayError: true };
    case types.HANDLE_HOLIDAY_MODAL:
      return { ...state, addHolidayModal: action.payload };

      case types.DELETE_HOLIDAY_REQUEST:
        return { ...state, deleteHoliday: true };
      case types.DELETE_HOLIDAY_SUCCESS:
        return {
          ...state,
          deleteHoliday: false,
          holidays: state.holidays.filter(
            (holiday) => holiday.holidayId !== action.payload
          ),
        };
      case types.DELETE_HOLIDAY_FAILURE:
        return { ...state, deleteHoliday: false, deleteHolidayError: false };
    default:
      return state;
  }
};
