import * as types from "./TaskActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import { getTasksListByUserId } from "../Auth/AuthAction";

export const getTaskCompleted = (userId, startDate, endDate) => (dispatch) => {
  ////debugger;
  console.log(startDate, endDate);
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/completed/${userId}`;
  } else {
    api_url = `/completed/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_TASKS_COMPLETED_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_COMPLETED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_COMPLETED_FAILURE,
        payload: err,
      });
    });
};

export const getTaskInProgress = (userId, startDate, endDate) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/inProgress/${userId}`;
  } else {
    api_url = `/inProgress/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_TASKS_INPROGRESS_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_INPROGRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_INPROGRESS_FAILURE,
        payload: err,
      });
    });
};

export const getTaskToStart = (userId, startDate, endDate) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/TaskToStart/${userId}`;
  } else {
    api_url = `/TaskToStart/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_TASKS_TOSTART_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_TOSTART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_TOSTART_FAILURE,
        payload: err,
      });
    });
};

export const getTaskAssigned = (userId, startDate, endDate) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/assignedTasks/${userId}`;
  } else {
    api_url = `/assignedTasks/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_TASKS_ASSIGNED_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_ASSIGNED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_ASSIGNED_FAILURE,
        payload: err,
      });
    });
};

export const getApprovalsClosed = (userId, startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/approveTasks/${userId}`;
  } else {
    api_url = `/approveTasks/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_APPROVALS_CLOSED_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVALS_CLOSED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVALS_CLOSED_FAILURE,
        payload: err,
      });
    });
};

export const getApprovalsPending = (userId, startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/approvalPending/${userId}`;
  } else {
    api_url = `/approvalPending/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_APPROVALS_PENDING_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVALS_PENDING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVALS_PENDING_FAILURE,
        payload: err,
      });
    });
};

export const getHighPriorityTaskCompleted = (userId, startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/highPriority/${userId}`;
  } else {
    api_url = `/highPriority/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({ type: types.GET_HIGH_PRIORITY_TASKS_COMPLETE_REQUEST });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_HIGH_PRIORITY_TASKS_COMPLETE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HIGH_PRIORITY_TASKS_COMPLETE_FAILURE,
        payload: err,
      });
    });
};

export const getTaskVelocity = (userId) => (dispatch) => {
  dispatch({ type: types.GET_TASK_VELOCITY_REQUEST });
  axios
    .get(`${base_url}/taskVelocity/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_VELOCITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_VELOCITY_FAILURE,
        payload: err,
      });
    });
};

export const getTimeZone = () => (dispatch) => {
  dispatch({
    type: types.GET_TIMEZONE_REQUEST,
  });
  axios
    .get(`${base_url}/timezone`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TIMEZONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TIMEZONE_FAILURE,
        payload: err,
      });
    });
};

/**
 * handle task modal opening and close
 */
export const handleTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_MODAL,
    payload: modalProps,
  });
};
/**
 * request for deleting a TASK
 */
export const deleteTask = (taskId, employeeId) => (dispatch, getState) => {
  console.log("inside deletetask", taskId);
  dispatch({
    type: types.DELETE_TASK_REQUEST,
  });

  axios
    .delete(`${base_url}/task/${taskId}/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_TASK_SUCCESS,
        payload: taskId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a TASK
 */
export const addTask = (task, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;

  console.log("inside addTask");
  dispatch({
    type: types.ADD_TASK_REQUEST,
  });

  axios
    .post(`${base_url}/task`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTasksListByUserId(userId));
      dispatch(getTaskListRangeByUserId(userId));
      dispatch({
        type: types.ADD_TASK_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TASK_FAILURE,
        payload: err,
      });
      cb();
    });
};

/**
 * update aspecific field using put request
 */
export const updateTask = (id, data, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_TASK_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/task/${id}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // dispatch(getTasksListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * update aspecific field using patch request
 */
export const patchTask = (id, data, cb) => (dispatch, getState) => {
  console.log(data);
  dispatch({ type: types.PATCH_TASK_BY_ID_REQUEST });
  axios
    .patch(
      `${base_url}/task/${id}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      // dispatch(getTaskListRangeByUserId(userId));
      dispatch({
        type: types.PATCH_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PATCH_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const rejectApprove = (taskId, data) => (dispatch) => {
  dispatch({ type: types.REJECT_APPROVE_REQUEST });

  axios
    .put(`${base_url}/task/rejected`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      ////debugger;
      console.log(res);
      dispatch({
        type: types.REJECT_APPROVE_SUCCESS,
        payload: res.data,
      });
      // console.log(res);
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REJECT_APPROVE_FAILURE,
      });
    });
};

export const approvedTask = (taskId, data, cb) => (dispatch) => {
  dispatch({ type: types.TASK_APPROVED_REQUEST });

  axios
    .put(`${base_url}/task/approved`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      ////debugger;
      console.log(res);
      dispatch({
        type: types.TASK_APPROVED_SUCCESS,
        payload: res.data,
      });
      // console.log(res);
      cb && cb();
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.TASK_APPROVED_FAILURE,
      });
      cb && cb();
    });
};

export const checkStatus = (taskId, OpportunityId, cb) => (dispatch) => {
  dispatch({ type: types.TASK_CHECK_REQUEST });

  axios
    .get(`${base_url}/taskStatus/${taskId}/${OpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.TASK_CHECK_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.TASK_CHECK_FAILURE,
      });
    });
};
/**
 * get list of tasks added by an user on aspecific range of date
 */
export const getTaskListRangeByUserId = (employeeId, startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/task/employee/${employeeId}`;
  } else {
    api_url = `/task/employee/${employeeId}?startDate=${startDate}&endDate=${endDate}`;
  }
  console.log(api_url);
  dispatch({
    type: types.GET_TASK_LIST_RANGE_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      ////debugger;
      console.log(res);
      dispatch({
        type: types.GET_TASK_LIST_RANGE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      ////debugger;
      console.log(err);
      dispatch({
        type: types.GET_TASK_LIST_RANGE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getTaskListRangeByUserIdForReport = (
  userId,
  startDate,
  endDate
) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/task/report/${userId}`;
  } else {
    api_url = `/task/report/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  console.log(api_url);
  dispatch({
    type: types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      ////debugger;
      console.log(res);
      dispatch({
        type: types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      ////debugger;
      console.log(err);
      dispatch({
        type: types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get list of tasks added by an user on aspecific range of date
 */
export const getTaskListRangeOfAllUsers = (startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/tasks/`;
  } else {
    api_url = `/tasks/?startDate=${startDate}&endDate=${endDate}`;
  }
  console.log(api_url);
  dispatch({
    type: types.GET_TASK_LIST_RANGE_OF_ALL_USERS_REQUEST,
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
        type: types.GET_TASK_LIST_RANGE_OF_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_LIST_RANGE_OF_ALL_USERS_FAILURE,
        payload: err,
      });
    });
};
export const approvedPartner = (taskId, data) => (dispatch) => {
  dispatch({ type: types.PARTNER_APPROVED_REQUEST });

  axios
    .post(`${base_url}/partner/approve-partner-task`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      ////debugger;
      console.log(res);
      // message.success(
      //   `Login request for Partner user in ${res.OpportunityName} has been Approved`
      // );
      dispatch({
        type: types.PARTNER_APPROVED_SUCCESS,
        payload: res.data,
      });
      // console.log(res);
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PARTNER_APPROVED_FAILURE,
      });
    });
};

export const rejectPartner = (taskId, data) => (dispatch) => {
  dispatch({ type: types.PARTNER_REJECT_REQUEST });

  axios
    .post(`${base_url}/partner/reject-partner-task`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      ////debugger;
      console.log(res);
      // message.success(
      //   `Login request for Partner user in ${res.OpportunityName} has been Rejected`
      // );
      dispatch({
        type: types.PARTNER_REJECT_SUCCESS,
        payload: res.data,
      });
      // console.log(res);
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PARTNER_REJECT_FAILURE,
      });
    });
};

export const approveTaskByTaskId = (taskId) => (dispatch, getState) => {
  dispatch({ type: types.APPROVE_TASK_BY_TASK_ID_REQUEST });
  axios
    .post(
      `${base_url}/approve/task/${taskId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // dispatch(getTasksListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.APPROVE_TASK_BY_TASK_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.APPROVE_TASK_BY_TASK_ID_FAILURE,
        payload: err,
      });
    });
};

export const rejectTaskByTaskId = (taskId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log(data);
  dispatch({ type: types.REJECT_TASK_BY_TASK_ID_REQUEST });
  axios
    .post(
      `${base_url}/reject/task/${taskId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch(getTasksListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.APPROVE_TASK_BY_TASK_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.APPROVE_TASK_BY_TASK_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * update Task modal
 */
 export const handleUpdateTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_TASK_MODAL,
    payload: modalProps,
  });
};
export const setEditTask = (name) => (dispatch) => {
  dispatch({
    type: types.SET_TASK_EDIT,
    payload: name,
  });
};