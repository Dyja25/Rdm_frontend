import * as types from "./CustomerActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";




/**
 * Customer modal action
 */
export const handleCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};

export const handleCustomerReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};

export const setCustomerViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_CUSTOMER_VIEW_TYPE,
    payload: viewType,
  });
};
/**
 * Customer Contact modal action
 */
export const handleCustomerContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_CONTACT_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a contact
 */
export const addCustomer = (customer) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_CUSTOMER_REQUEST,
  });

  axios
    .post(`${base_url}/customer`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch(getRecords(userId));
      // dispatch(getLatestCustomers(userId, startDate, endDate));
      dispatch(getCustomerListByUserId(userId));

      dispatch({
        type: types.ADD_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/**
 * get all the customer of the user
 */
export const getCustomerListByUserId = (userId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_CUSTOMERS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMERS_FAILURE,
        payload: err,
      });
    });
};

export const getAllCustomerListByUserId = () => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_ALL_CUSTOMERS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/all-customer`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CUSTOMERS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get a specific Customer of the user with the CustomerId
 */
export const getCustomerById = (customerId) => (dispatch) => {
  console.log("inside add Customer");
  dispatch({
    type: types.GET_CUSTOMER_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//Customer Details
export const getCustomerDetailsById = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//Document

export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

export const handleInvoiceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVOICE_MODAL,
    payload: modalProps,
  });
};

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/customer/document/${documentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_DOCUMENT_SUCCESS,
        payload: documentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_CUSTOMER_NOTES_REQUEST });
  axios
    .post(`${base_url}/customer/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_CUSTOMER_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CUSTOMER_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};
/**
 * get Customer Notes
 */
export const getNotesListByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/note/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Update Customer Modal
 */
export const handleUpdateCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};

export const setEditCustomer = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CUSTOMER_EDIT,
    payload: name,
  });
};

/**
 * update a customer using put request
 */
export const updateCustomer = (data, customerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_CUSTOMER_BY_ID_REQUEST });
  axios
    .put(`${base_url}/customer/${customerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CUSTOMER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * add document to a customer
 */
export const addCustomerDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_CUSTOMER_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/customer/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CUSTOMER_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get documents of an customer
 */
export const getCustomerDocument = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/customer/document/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

/*request for adding a customer  opportunity */
export const addCustomerOpportunity = (opportunity, cb) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  const customerId = getState().customer.customer.customerId;
  dispatch({
    type: types.ADD_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/customer/opportunity`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch(getOpportunityListByCustomerId(customerId));
      // dispatch(getLatestOpportunities(userId, startDate, endDate));
      // dispatch(getOpportunitiesByPrice(userId));
      dispatch({
        type: types.ADD_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
/*get all the opportunity of the customer */
export const getOpportunityListByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/customer/opportunity/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

//updateCustomerOpportunity
export const updateCustomerOpportunity = (data, opportunityId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/customer/opportunity/${opportunityId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getOpportunityListByCustomerId(customerId));
      dispatch({
        type: types.UPDATE_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a contact
 */
export const addCustomerContact = (contact) => (dispatch, getState) => {
  // const userId = getState().auth.userDetails.userId;
  const customerId = getState().customer.customer.customerId;
  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add contact");
  dispatch({
    type: types.ADD_CUSTOMER_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/customer/contact`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(
      //   linkContactsToOpportunity(opportunityId, { contactIds: [res.data] }, cb)
      // );
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      // dispatch(getContactById(contactId));
      // dispatch(getLatestContacts(userId, startDate, endDate));
      dispatch(getContactListByCustomerId(customerId));

      dispatch({
        type: types.ADD_CUSTOMER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/*get all the contact of the customer */
export const getContactListByCustomerId = (customerId) => (dispatch) => {
  console.log(customerId);
  dispatch({
    type: types.GET_CUSTOMER_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/customer/contacts/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_CONTACT_FAILURE,
        payload: err,
      });
    });
};
/**
 * Customer Opportunity modal action
 */
export const handleCustomerOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};
export const handleUpdateCustomerOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

//SEARCH
export const inputCustomerDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_CUSTOMER_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/customer/Name/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.customerId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_CUSTOMER_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CUSTOMER_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

//CONTACT PERMISSION SHARE Of Partner
export const shareCustomerPermission = (data, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_CUSTOMER_PERMISSION_REQUEST,
  });

  axios
    .post(`${base_url}/permission/details/${0}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (a === "All") {
        dispatch(getAllCustomerListByUserId());
        dispatch(getRecords(userId));
      } else {
        dispatch(getCustomerListByUserId(userId));
        dispatch(getRecords(userId));
      }
      dispatch({
        type: types.ADD_SHARE_CUSTOMER_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_CUSTOMER_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const getPermissionsListCustomer = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"customer"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getRecordDelete = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_DELETE_REQUEST,
  });
  axios
    .get(`${base_url}/customer/deleted/list-count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECORDS_DELETE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECORDS_DELETE_FAILURE,
        payload: err,
      });
    });
};

// Add Recruit Modal
export const handleRecruitModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUIT_MODAL,
    payload: modalProps,
  });
};

// Add File Recruitment Modal
export const handlefileRecruitModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FILE_RECRUIT_MODAL,
    payload: modalProps,
  });
};
// Add Profile Modal
export const handleTagProfileModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TAGPROFILE_MODAL,
    payload: modalProps,
  });
};

// recruit add
export const addRecruit = (data, customerId, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RECRUIT_TO_CUSTOMER_REQUEST });

  axios
    .post(`${base_url}/link/recruitment/customer`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      message.success("Requirement added successfully!");
      // dispatch(getRecruitByOpportunityId(opportunityId));
      console.log(res);
      dispatch({
        type: types.LINK_RECRUIT_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_TO_CUSTOMER_FAILURE,
      });
      cb && cb();
    });
};

// recruit get
export const getRecruitByCustomerId = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUIT_TO_CUSTOMER_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_RECRUIT_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUIT_TO_CUSTOMER_FAILURE,
      });
    });
};

export const getProfile = (customerId) => (dispatch) => {
  dispatch({ type: types.LINK_PROFILE_TO_CUSTOMER_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getProfileByCustomerId(customerId));
      console.log(res);
      dispatch({
        type: types.LINK_PROFILE_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PROFILE_TO_CUSTOMER_FAILURE,
      });
    });
};

export const addRecruitProProfile = (data, cb) => (dispatch) => {
  dispatch({ type: types.ADD_RECRUITMENT_PROFILE_REQUEST });

  axios
    .post(`${base_url}/create/profile `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_FAILURE,
      });
      cb && cb();
    });
};

export const setCurrentRecruitMentData = (data) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_RECRUITMENT_DATA, payload: data });
};

export const handleSponsorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SELECT_SPONSOR_MODAL,
    payload: modalProps,
  });
};

//setEditCustomerOpportunity
export const setEditCustomerOpportunity = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CUSTOMER_OPPORTUNITY,
    payload: name,
  });
};

export const addAttendence = (attendance) => (dispatch) => {


  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  // console.log("inside add customer");
  dispatch({
    type: types.ADD_ATTENDENCE_REQUEST,
  });

  axios
    .post(`${base_url}/attendance`, attendance, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);


      dispatch({
        type: types.ADD_ATTENDENCE_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ATTENDENCE_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const putCustomerContactToggle = (data, contactId) => (dispatch) => {
  dispatch({ type: types.PUT_CUSTO_CONTACT_TOGGLE_REQUEST });

  axios
    .post(`${base_url}/task/convert/contact/${contactId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      //dispatch(getContactListByCustomerId(customerId))
      console.log(res);
      dispatch({
        type: types.PUT_CUSTO_CONTACT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PUT_CUSTO_CONTACT_TOGGLE_FAILURE,
      });
    });
};


export const getCustomerListByCategory = (category) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMERS_BY_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url}/customer/categoryName/${category}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMERS_BY_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMERS_BY_CATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const getCategoryRecords = (category) => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/record/count/categoryName/${category}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (category === "White") {

        dispatch({
          type: types.GET_CATEGORY_RECORDS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: types.GET_CATEGORY_RECORDS_BLUE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CATEGORY_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const addCommercialsByCustomerId = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/customer/commission}`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//get Commercials by customerId
export const getCommercialsByCustomerId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/commission/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//ADD INVOICE
export const addInvoiceByCustomerId = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_INVOICE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/invoice/customer}`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_INVOICE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVOICE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//GET INVOICE
export const getInvoiceByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_INVOICE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}customer/invoice/{customerId}/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVOICE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVOICE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateOwnercustomerById= (userId,data) => (dispatch,getState) => {
  const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_CUSTOMER_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/customer/transfer/${userId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     dispatch(getCustomerListByUserId(userId1));
      dispatch({
        type: types.UPDATE_CUSTOMER_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
}; 


export const getCustomerRecruit = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_RECRUIT_REQUEST });

  axios
    .get(`${base_url}/customer/open/recuitment/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_RECRUIT_FAILURE,
      });
    });
};

export const getCustomerDeleteData = (userId) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_DELETE_DATA_REQUEST });

  axios
    .get(`${base_url}/customer/deleted/list/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_DELETE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_DELETE_DATA_FAILURE,
      });
    });
};



export const deleteCustomerData = ( customerId ) => (dispatch) => {
  dispatch({ type: types.DELETE_CUSTOMER_DATA_REQUEST });

  axios
    .delete(`${base_url}/customer/delete/${customerId} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_CUSTOMER_DATA_SUCCESS,
        payload: customerId,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CUSTOMER_DATA_FAILURE,
      });
      // cb && cb("failure");
    });
};

export const reinstateToggleForCustomer = (customerId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_CUSTOMER_REQUEST,
  });
  axios
    .put(`${base_url}/customer/reinitiate/${customerId}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedCandidate(userId,0));
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_CUSTOMER_SUCCESS,
        payload: customerId,
      });
      message.success("Customer reinstate Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_CUSTOMER_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};