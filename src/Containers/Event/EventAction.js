import * as types from "./EventActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import { getEventsListByUserId } from "../Auth/AuthAction";

/**
 * handle event modal opening and close
 */
export const handleEventModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EVENT_MODAL,
    payload: modalProps,
  });
};
/**
 * request for deleting a EVENT
 */
export const deleteEvent = (eventId, employeeId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log("inside deleteevent", eventId);
  dispatch({
    type: types.DELETE_EVENT_REQUEST,
  });

  axios
    .delete(`${base_url}/event/${eventId}/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEventsListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.DELETE_EVENT_SUCCESS,
        payload: eventId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EVENT_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a EVENT
 */
export const addEvent = (event, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // const { startDate, endDate } = getState("dashboard").dashboard;
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_EVENT_REQUEST,
  });

  axios
    .post(`${base_url}/event`, event, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getEventsListByUserId(userId));
      dispatch(getEventListRangeByUserId(userId));
      dispatch({
        type: types.ADD_EVENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EVENT_FAILURE,
        payload: err,
      });
      cb();
    });
};
/**
 *  set rating value

*/
export const setRating = (value) => (dispatch) => {
  dispatch({
    type: types.SET_RATING_VALUE,
    payload: value,
  });
};
/**
 *  set item id

*/
export const setId = (value) => (dispatch) => {
  debugger;
  dispatch({
    type: types.SET_ID_VALUE,
    payload: value,
  });
};

/**
 * update aspecific field using put request
 */
export const updateEvent = (id, data, cb) => (dispatch, getState) => {
  //debugger
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_EVENT_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/event/${id}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      //debugger

      //   dispatch(getEventsListByUserId(userId));
      console.log(res);

      dispatch({
        type: types.UPDATE_EVENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      // dispatch({
      //   type: UPDATE_TODOEVENT_SUCCESS,
      //   payload: res.data
      // })
      // dispatch({type:UPDATE_EVENTS_LIST_BY_USER_ID_SUCCESS,
      // payload:res.data})
      cb();
    })
    .catch((err) => {
      //debugger
      console.log(err);
      dispatch({
        type: types.UPDATE_EVENT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get list of tasks added by an user on aspecific range of date
 */
export const getEventListRangeByUserId = (employeeId, startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/event/employee/${employeeId}`;
  } else {
    api_url = `/event/employee/${employeeId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_EVENT_LIST_RANGE_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getEventListRangeByType = (
  userId,
  eventType,
  startDate,
  endDate
) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/eventReport/${userId}/${eventType}`;
  } else {
    api_url = `/eventReport/${userId}/${eventType}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_EVENT_LIST_RANGE_BY_TYPE_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_BY_TYPE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_BY_TYPE_FAILURE,
        payload: err,
      });
    });
};
/**
 * get list of tasks added by an user on aspecific range of date
 */
export const getEventListRangeOfAllUsers = (startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/events`;
  } else {
    api_url = `/events?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EVENT_LIST_RANGE_OF_ALL_USERS_FAILURE,
        payload: err,
      });
    });
};
/**
 * get notes list by eventId
 */
export const getNotesListByEventId = (eventId) => (dispatch) => {
  console.log(eventId);
  dispatch({
    type: types.GET_NOTES_LIST_BY_EVENT_ID_REQUEST,
  });
  axios
    .get(`${base_url}/event/note/${eventId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EVENT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EVENT_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditNoteEvent = (name) => (dispatch) => {
  dispatch({
    type: types.SET_NOTE_EVENT_EDIT,
    payload: name,
  });
};

/**
 * update Event modal
 */
 export const handleUpdateEventModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EVENT_MODAL,
    payload: modalProps,
  });
};


export const setEditEvents = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EVENTS_EDIT,
    payload: name,
  });
};