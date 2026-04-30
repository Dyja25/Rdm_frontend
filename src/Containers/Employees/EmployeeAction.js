import * as types from "./EmployeeActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";

export const setEmployeeViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_EMPLOYEE_VIEW_TYPE, payload: viewType });

export const updateEmployeeAddress = (employeeId, address) => (dispatch) => {
  debugger;
  console.log(employeeId, address);
  dispatch({
    type: types.UPDATE_EMPLOYEE_ADDRESS,
    payload: {
      employeeId,
      address,
    },
  });
};

export const addEmployeeAddress = (address) => (dispatch) => {
  ////debugger;
  // console.log(accountId);
  dispatch({
    type: types.ADD_EMPLOYEE_ADDRESS,
    payload: {
      address,
    },
  });
};

/**
 * request for adding an employee
 */

export const addEmployee = (employee) => (dispatch) => {
  dispatch({
    type: types.ADD_EMPLOYEE_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEmployeelist());
      dispatch({
        type: types.ADD_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMPLOYEE_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

  export const deleteEmployeeData = ( empId ) => (dispatch) => {
    dispatch({ type: types.DELETE_EMPLOYEE_DATA_REQUEST });
  
    axios
      .delete(`${base_url}/employee/delete/${empId} `,  {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_EMPLOYEE_DATA_SUCCESS,
          payload: candidateId,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_EMPLOYEE_DATA_FAILURE,
        });
        // cb && cb("failure");
      });
  };

/**
 * Fetching all employees of org
 */
export const getEmployeelist = () => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_LIST_REQUEST,
  });

  axios
    .get(`${base_url}/employee/employees`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_FAILURE,
        payload: err,
      });
    });
};
/**
 * set company name, domain and logo from clearbit
 */
export const setClearbitData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_DATA,
    payload: data,
  });
};

//get specific employeeDetails by emp Id
export const getEmployeeById = (employeeId) => (dispatch) => {
  // console.log("inside getAccountById");
  dispatch({
    type: types.GET_EMPLOYEE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateEmployeeById = (data,employeeId,cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_EMPLOYEE_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/employee/${employeeId}`,data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMPLOYEE_BY_ID_SUCCESS,
        payload: res.data
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      // if (id === userId) {
      // }
      dispatch({
        type: types.UPDATE_EMPLOYEE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//employee Modal
export const handleEmployeeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_MODAL,
    payload: modalProps,
  });
};

/**
 * get Employees Notes
 */
export const getNotesListByEmployeeId = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/notes/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_FAILURE,
        payload: err,
      });
    });
};

export const addNote = (note, cb) => (dispatch) => {
  axios
    .post(`${base_url}/employee/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      cb && cb();
    });
};

/**
 * get documents of an employee
 */
export const getEmployeeDocument = (employeeId) => (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEE_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  // axios
  //   .delete(`${base_url}/opportunity/${opportunityId}/document/${documentId}`, {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //     },
  //   })
  //   .then((res) => {
  //     dispatch({
  //       type: types.DELETE_DOCUMENT_SUCCESS,
  //       payload: employeeId,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: types.DELETE_DOCUMENT_FAILURE,
  //       payload: err,
  //     });
  //   });
};

/**
 * document upload modal in opportunity
 */
export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

/**
 * link document to a employee
 */
export const addEmployeeDocument = (documentId, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_EMPLOYEE_DOCUMENT_REQUEST });
  axios
    // .put(`${base_url}/opportunity/document/${documentId}`, data, {
    //   headers: {
    //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    //   },
    // })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_EMPLOYEE_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMPLOYEE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const handleEmployeeDrawerForAdmin = (isVisible) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_DRAWER_FOR_ADMIN,
    payload: { isVisible: isVisible },
  });
};

//suspend
export const suspendEmployee = (data, cb,employeeId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.SUSPEND_EMPLOYEE_REQUEST,
  });
  axios
    .put(`${base_url}/suspend/employee/${employeeId}`, data,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.SUSPEND_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
      cb && cb("success", res.data.message, res.data.assignInd);
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.SUSPEND_EMPLOYEE_FAILURE,
        payload: err,
      });
      cb && cb("failuer", null, null);
    });
};


//SEARCH
export const inputEmployeeDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_EMPLOYEE_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/employee/search/all/type/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.employeeId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_EMPLOYEE_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_EMPLOYEE_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const shareEmployeePermission = (data, userId) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_EMPLOYEE_PERMISSION_REQUEST,
  });

  axios
    .post(`${base_url}/permission/details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getEmployeeListByUserId(userId));
      // dispatch(getRecords(userId));
      dispatch({
        type: types.ADD_SHARE_EMPLOYEE_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_EMPLOYEE_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};
export const getEmployeePermissionsList = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"employee"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_FAILURE,
        payload: err,
      });
    });
};


export const suspendStatus = (data,cb,employeeId ) => (
  dispatch,
  getState
) => {
  // debugger;
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.SUSPEND_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/active/employee/${employeeId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.SUSPEND_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success", res.data.message, res.data.suspendInd);
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SUSPEND_STATUS_FAILURE,
        payload: err,
      });
       cb && cb("failuer");
    });
};

export const employeeStatus = (data,employeeId ) => (
  dispatch,
  getState
) => {
  // debugger;
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.EMPLOYEE_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/employee/${employeeId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.EMPLOYEE_STATUS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data.message, res.data.suspendInd);
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.EMPLOYEE_STATUS_FAILURE,
        payload: err,
      });
      //  cb && cb("failuer");
    });
};


