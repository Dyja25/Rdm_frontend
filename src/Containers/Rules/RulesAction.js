import * as types from "./RulesActionType";
import { base_url } from "../../Config/Auth";
import axios from "axios";

export const handleTemplateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEMPLATE_MODAL,
    payload: modalProps,
  });
};
export const handleTemplateNotificatonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEMPLATE_NOTIFICATION_MODAL,
    payload: modalProps,
  });
};

export const handleTemplateViewModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEMPLATE_VIEW_MODAL,
    payload: modalProps,
  });
};

export const handleLeavesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LEAVES_MODAL,
    payload: modalProps,
  });
};
export const setCurrentNotification = (name) => (dispatch) => {
  ////debugger
  dispatch({
    type: types.SET_CURRENT_NOTIFICATION,
    payload: name,
  });
};

export const addSla = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_SLA_REQUEST,
  });

  axios
    .put(`${base_url}/rule`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SLA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_SLA_FAILURE,
        payload: err,
      });
    });
};

export const getSla = (processId) => (dispatch) => {
  dispatch({
    type: types.GET_SLA_REQUEST,
  });

  axios
    .get(`${base_url}/rule/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SLA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_SLA_FAILURE,
        payload: err,
      });
    });
};

export const addMatrix = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_MATRIX_REQUEST,
  });

  axios
    .post(`${base_url}/ruleMatrix`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.ADD_MATRIX_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_MATRIX_FAILURE,
        payload: err,
      });
    });
};

export const getMatrix = (processId, priority) => (dispatch) => {
  dispatch({
    type: types.GET_MATRIX_REQUEST,
  });

  axios
    .get(`${base_url}/ruleMatrix/${processId}/${priority}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATRIX_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_MATRIX_FAILURE,
        payload: err,
      });
    });
};

export const addTemplate = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_TEMPLATE_REQUEST,
  });

  axios
    .post(`${base_url}/email/template`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTemplate());
      dispatch({
        type: types.ADD_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const addNotificationTemplate = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_NOTIFICATION_TEMPLATE_REQUEST,
  });

  axios
    .post(`${base_url}/notifcation`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getNotificationTemplate());
      dispatch({
        type: types.ADD_NOTIFICATION_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_NOTIFICATION_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const getTemplate = () => (dispatch) => {
  dispatch({
    type: types.GET_TEMPLATE_REQUEST,
  });

  axios
    .get(`${base_url}/email/templates`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const getNotificationTemplate = () => (dispatch) => {
  dispatch({
    type: types.GET_NOTIFICATION_TEMPLATE_REQUEST,
  });

  axios
    .get(`${base_url}/notificationTemplate`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTIFICATION_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_NOTIFICATION_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const updateTemplate = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_TEMPLATE_REQUEST,
  });

  axios
    .put(`${base_url}/email/template`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getTemplate());
      console.log(res);
      dispatch({
        type: types.UPDATE_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const updateNotificationTemplate = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_NOTIFICATION_TEMPLATE_REQUEST,
  });

  axios
    .put(`${base_url}/update/notification`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getNotificationTemplate());

      dispatch({
        type: types.UPDATE_NOTIFICATION_TEMPLATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_NOTIFICATION_TEMPLATE_FAILURE,
        payload: err,
      });
    });
};

export const setCurrentEmail = (name) => (dispatch) => {
  //debugger
  dispatch({
    type: types.SET_CURRENT_EMAIL,
    payload: name,
  });
};

export const addsQuoteProSearchTab = (data, orgId) => (dispatch) => {
  dispatch({
    type: types.ADD_SEARCH_TAB_REQUEST,
  });

  axios
    .put(`${base_url}/advance/recriutmentRule`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getQuoteProSearchTab(orgId));
      dispatch({
        type: types.ADD_SEARCH_TAB_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_SEARCH_TAB_FAILURE,
        payload: err,
      });
    });
};

export const getQuoteProSearchTab = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_TAB_REQUEST,
  });

  axios
    .get(`${base_url}/advance/recriutmentRule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEARCH_TAB_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_SEARCH_TAB_FAILURE,
        payload: err,
      });
    });
};

//RecruitPro For Email
export const addRecruitProForEmail = (data, orgId) => (dispatch) => {
  dispatch({
    type: types.ADD_RECRUITPRO_FOR_EMAIL_REQUEST,
  });

  axios
    .put(`${base_url}/recruit/mail`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getRecruitProForEmail(orgId));
      dispatch({
        type: types.ADD_RECRUITPRO_FOR_EMAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_RECRUITPRO_FOR_EMAIL_FAILURE,
        payload: err,
      });
    });
};

export const getRecruitProForEmail = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITPRO_FOR_EMAIL_REQUEST,
  });

  axios
    .get(`${base_url}/recruitPro/mail/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_RECRUITPRO_FOR_EMAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_RECRUITPRO_FOR_EMAIL_FAILURE,
        payload: err,
      });
    });
};
