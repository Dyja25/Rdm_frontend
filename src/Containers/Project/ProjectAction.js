import * as types from "./ProjectActionTypes.js";
import axios from "axios";
import { base_url } from "../../Config/Auth";
// import { getEventsListByUserId } from "../Auth/AuthAction";



export const handleProjectModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROJECT_MODAL,
    payload: modalProps,
  });
};
/**
 * request for adding a Project
 */
 export const addProject = (project, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addProject");
    dispatch({
      type: types.ADD_PROJECT_REQUEST,
    });
  
    axios
      .post(`${base_url}/project`, project, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getEventsListByUserId(userId));
        // dispatch(getEventListRangeByUserId(userId));
        dispatch({
          type: types.ADD_PROJECT_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PROJECT_FAILURE,
          payload: err,
        });
        cb();
      });
  };

  /**
 * update aspecific field using put request
 */
export const updateProject = (projectId, data, cb) => (dispatch, getState) => {
  //debugger
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_PROJECT_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/project/${projectId}}`,
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
        type: types.UPDATE_PROJECT_BY_ID_SUCCESS,
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
        type: types.UPDATE_PROJECT_BY_ID_FAILURE,
        payload: err,
      });
    });
};