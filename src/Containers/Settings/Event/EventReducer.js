import * as types from "./EventActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingEvents: false,
    fetchingEventsError: false,
    events: [],

    addingEvents: false,
    addingEventsError: false,

    // removingEvents: false,
    // removingEventsError: false,

    updatingEvents: false,
    updatingEventsError: false,

   
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Event
     */
    case types.GET_EVENTS_REQUEST:
        return { ...state, fetchingEvents: true };
      case types.GET_EVENTS_SUCCESS:
        return { ...state, fetchingEvents: false, events: action.payload };
      case types.GET_EVENTS_FAILURE:
        return { ...state, fetchingEvents: false, fetchingEventsError: true };


         /**
     * add a new Event 
     */
    case types.ADD_EVENTS_REQUEST:
        return { ...state, addingEvents: true };
      case types.ADD_EVENTS_SUCCESS:
        return {
          ...state,
          addingEvents: false,
          events: [...state.events, action.payload],
        };
      case types.ADD_EVENTS_FAILURE:
        return { ...state, addingEvents: false, addingEventsError: true };


         /**
     * remove an existing EVENTS
     */
    case types.REMOVE_EVENTS_REQUEST:
        return { ...state, removingEvents: true };
      case types.REMOVE_EVENTS_SUCCESS:
        return {
          ...state,
          removingEvents: false,
          events: state.events.filter(
            (event) => event.eventTypeId !== action.payload
          ),
        };
      case types.REMOVE_EVENTS_FAILURE:
        return { ...state, removingEvents: false, removingEventsError: true };



         /**
     * update an existing EVENTS
     */
    case types.UPDATE_EVENTS_REQUEST:
        return { ...state, updatingEvents: true };
      case types.UPDATE_EVENTS_SUCCESS:
        // return { ...state, updatingEvents: false, Events: [...state.Events, action.payload] };
        return {
          ...state,
          updatingEvents: false,
          events: state.events.map((event) =>
          event.eventTypeId === action.payload.eventTypeId
              ? action.payload
              : event
          ),
        };
      case types.UPDATE_EVENTS_FAILURE:
        return { ...state, updatingEvents: false, updatingEventsError: true };

        default:
            return state;
        }
      };
