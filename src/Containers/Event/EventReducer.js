import * as types from "./EventActionTypes";

const initialState = {
  addEventModal: false,
  addingEvent: false,
  addingEventError: false,
  deleteEvent: false,
  deleteEventError: false,
  updatingEvent: false,
  updatingEventError: false,

  fetchingEventListRangeByUserId: false,
  fetchingEventListRangeByUserIdError: false,
  eventListRangeByUserId: [],

  fetchingEventListRangeByType: false,
  fetchingEventListRangeByTypeError: false,
  eventListRangeByType: [],

  fetchingEventListRangeOfAllUsers: false,
  fetchingEventListRangeOfAllUsersError: false,
  eventListRangeOfAllUsers: [],

  ratingValue: "",
  idValue: {},

  fetchingNotesListByEventId: false,
  fetchingNotesListByEventIdError: false,
  notesListByEventId: [],

  setEditingNoteEvent: {},

  setEditingEvents: {},
  updateEventModal: false,

};
export const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_EVENT_MODAL:
      return { ...state, addEventModal: action.payload };
    case types.ADD_EVENT_REQUEST:
      return { ...state, addingEvent: true };
    case types.ADD_EVENT_SUCCESS:
      return { ...state, addingEvent: false, addEventModal: false };
    case types.ADD_EVENT_FAILURE:
      return {
        ...state,
        addingEvent: false,
        addingEventError: false,
        addEventModal: false,
      };
    /**
     * delete a event permanently
     */
    case types.DELETE_EVENT_REQUEST:
      return { ...state, deleteEvent: true };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleteEvent: false,
        addEventModal: false,
        eventListRangeByUserId: state.eventListRangeByUserId.filter(
          (item) => item.eventId !== action.payload
        ),
      };
    case types.DELETE_EVENT_FAILURE:
      return { ...state, deleteEvent: false, deleteEventError: false };
    /**
     * update a event
     */
    case types.UPDATE_EVENT_BY_ID_REQUEST:
      return { ...state, updatingEvent: true };
    case types.UPDATE_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingEvent: false,
        // eventListRangeByUserId: state.eventListRangeByUserId.map((item, i) => {
        //   //debugger;
        //   if (
        //     item.eventId === action.payload.eventId

        //   ) {
        //     //debugger;
        //     return action.payload;
        //   } else {
        //     //debugger;
        //     return item;
        //   }
        // })
      };
    case types.UPDATE_EVENT_BY_ID_FAILURE:
      return { ...state, updatingEvent: false, updatingEventError: false };
    /**
     * get events list by userId
     */
    case types.GET_EVENT_LIST_RANGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingEventListRangeByUserId: true };
    case types.GET_EVENT_LIST_RANGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingEventListRangeByUserId: false,
        eventListRangeByUserId: action.payload,
      };
    case types.GET_EVENT_LIST_RANGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingEventListRangeByUserId: false,
        fetchingEventListRangeByUserIdError: true,
      };

    case types.GET_EVENT_LIST_RANGE_BY_TYPE_REQUEST:
      return { ...state, fetchingEventListRangeByType: true };
    case types.GET_EVENT_LIST_RANGE_BY_TYPE_SUCCESS:
      return {
        ...state,
        fetchingEventListRangeByType: false,
        eventListRangeByType: action.payload,
      };
    case types.GET_EVENT_LIST_RANGE_BY_TYPE_FAILURE:
      return {
        ...state,
        fetchingEventListRangeByType: false,
        fetchingEventListRangeByTypeError: true,
      };
    /**
     * get events list by userId
     */
    case types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_REQUEST:
      return { ...state, fetchingEventListRangeOfAllUsers: true };
    case types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_SUCCESS:
      return {
        ...state,
        fetchingEventListRangeOfAllUsers: false,
        eventListRangeOfAllUsers: action.payload,
      };
    case types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_FAILURE:
      return {
        ...state,
        fetchingEventListRangeOfAllUsers: false,
        fetchingEventListRangeOfAllUsersError: true,
      };

    case types.SET_RATING_VALUE:
      return { ...state, ratingValue: action.payload };

    case types.SET_ID_VALUE:
      return { ...state, idValue: action.payload };

    /**
     * get notes list by eventtId
     */
    case types.GET_NOTES_LIST_BY_EVENT_ID_REQUEST:
      return { ...state, fetchingNotesListByEventId: true };
    case types.GET_NOTES_LIST_BY_EVENT_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByEventId: false,
        notesListByEventId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_EVENT_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByEventId: false,
        fetchingNotesListByEventIdError: true,
      };

   
    /**
     * update Event modal
     */
     case types.HANDLE_UPDATE_EVENT_MODAL:
      return { ...state, updateEventModal: action.payload };


    case types.SET_EVENTS_EDIT:
      return { ...state, setEditingEvents: action.payload };
  
      default:
      return state;
    
  }
  return state;
};
