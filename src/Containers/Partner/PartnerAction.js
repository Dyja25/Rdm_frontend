import * as types from "./PartnerActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";
import { base_url } from "../../Config/Auth";

/**
 * Partner modal action
 */
export const handlePartnerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PARTNER_MODAL,
    payload: modalProps,
  });
};

export const emptyPartner = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_PARTNER_TABLE,
    
  });
};
/**
 * request for adding a partner
 */
export const addPartner = (partner) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add partner");
  dispatch({
    type: types.ADD_PARTNER_REQUEST,
  });

  axios
    .post(`${base_url}/partner`, partner, {
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

      // dispatch(getPartnerListByUserId(userId));
      dispatch(getRecords(userId));
      dispatch({
        type: types.ADD_PARTNER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/**
 * get all the customer of the user
 */
export const getPartnerListByUserId = (userId,pageNo=0) => (dispatch) => {
 
  dispatch({
    type: types.GET_PARTNERS_REQUEST,
  });
  axios
    .get(`${base_url}/partner/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNERS_FAILURE,
        payload: err,
      });
    });
};

export const getAllPartnerListByUserId = () => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_PARTNERS_ALL_REQUEST,
  });
  axios
    .get(`${base_url}/partner/all/partner `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNERS_ALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNERS_ALL_FAILURE,
        payload: err,
      });
    });
};

/*get all the partner of the partner */
export const getContactListByPartnerId = (partnerId) => (dispatch) => {
  console.log(partnerId);
  dispatch({
    type: types.GET_PARTNER_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/partner/contact/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNER_CONTACT_FAILURE,
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

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/partner/document/${documentId}`, {
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
 * add document to a partner
 */
export const addPartnerDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_PARTNER_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/partner/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PARTNER_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get documents of an partner
 */
export const getPartnerDocument = (partnerId) => (dispatch) => {
  dispatch({ type: types.GET_PARTNER_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/partner/document/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PARTNER_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};
/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PARTNER_NOTES_REQUEST });
  axios
    .post(`${base_url}/partner/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_PARTNER_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PARTNER_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};
/**
 * get Partner Notes
 */
export const getNotesListByPartnerId = (partnerId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_PARTNER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/partner/note/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};

/*get all the opportunity of the partner */
export const getOpportunityListByPartnerId = (partnerId) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/partner/opportunity/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

//Partner Details
export const getPartnerDetailsById = (partnerId) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/partner/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PARTNER_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const handlePartnerContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PARTNER_CONTACT_MODAL,
    payload: modalProps,
  });
};
/**
 * request for adding a partner
 */
export const addPartnerContact = (partner) => (dispatch, getState) => {
  const partnerId = getState().partner.partner.partnerId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add partner");
  dispatch({
    type: types.ADD_PARTNER_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/partner/contact`, partner, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(
      //   linkContactsToOpportunity(opportunityId, { partnerIds: [res.data] }, cb)
      // );
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      // dispatch(getContactById(partnerId));
      // dispatch(getLatestContacts(userId, startDate, endDate));
      dispatch(getContactListByPartnerId(partnerId));

      dispatch({
        type: types.ADD_PARTNER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const handlePartnerOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PARTNER_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

/*request for adding a opportunity */
export const addPartnerOpportunity = (opportunity, cb) => (
  dispatch,
  getState
) => {
  const partnerId = getState().partner.partnerId;
  dispatch({
    type: types.ADD_PARTNER_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/partner/opportunity`, opportunity, {
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
      dispatch(getOpportunityListByPartnerId(partnerId));
      // dispatch(getLatestOpportunities(userId, startDate, endDate));
      // dispatch(getOpportunitiesByPrice(userId));
      dispatch({
        type: types.ADD_PARTNER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
/**
 * add skills of a partnerId
 */
export const addTopicByPartnerId = (data, partnerId) => (dispatch) => {
  console.log(partnerId);
  dispatch({
    type: types.ADD_TOPIC_BY_PARTNER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/partner/skillSet`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTopicsByPartnerId(partnerId));
      dispatch({
        type: types.ADD_TOPIC_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};

//get skills by partnerId
export const getTopicsByPartnerId = (partnerId) => (dispatch) => {
  dispatch({
    type: types.GET_TOPICS_BY_PARTNER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/partner/skill-set/${partnerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};
//delete partner skill
export const deleteTopicByPartnerId = (skillSetDetailsId, partnerId) => (
  dispatch,
  getState
) => {
  const partnerId = getState().partner.partner.partnerId;
  dispatch({
    type: types.DELETE_TOPIC_BY_PARTNER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/partner/skilsset/${skillSetDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
      dispatch(getTopicsByPartnerId(partnerId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Update Partner Modal
 */
export const handleUpdatePartnerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PARTNER_MODAL,
    payload: modalProps,
  });
};

export const setEditPartner = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PARTNER_EDIT,
    payload: name,
  });
};

/**
 * update a customer using put request
 */
export const updatePartner = (data, partnerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PARTNER_BY_ID_REQUEST });
  axios
    .put(`${base_url}/partner/${partnerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PARTNER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PARTNER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Update Partner Contact Modal
 */
export const handleUpdatePartnerContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PARTNER_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const setEditPartnerContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PARTNER_CONTACT_EDIT,
    payload: name,
  });
};
/**
 * update a partner contact using put request
 */
export const updatePartnerContact = (data, partnerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PARTNER_CONTACT_BY_ID_REQUEST });
  axios
    .put(`${base_url}/partner/contact/${partnerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PARTNER_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PARTNER_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//SEARCH
export const inputPartnerDataSearch = (partnerName) => (dispatch) => {
  dispatch({
    type: types.INPUT_PARTNER_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/partner/Name/${partnerName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.partnerId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_PARTNER_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_PARTNER_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * update a customer using put request
 */
export const updatePartnerBankDetails = (data, partnerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PARTNER_BANK_DETAILS_BY_ID_REQUEST });
  axios
    .put(`${base_url}/partner/${partnerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPartnerDetailsById(partnerId));
      dispatch({
        type: types.UPDATE_PARTNER_BANK_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PARTNER_BANK_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * update contact address
 * @param {string} accountId
 * @param {address object} address
 */
export const updatePartnerAddress = (partnerId, address) => (dispatch) => {
  console.log(partnerId, address);
  dispatch({
    type: types.UPDATE_PARTNER_ADDRESS,
    payload: {
      partnerId,
      address,
    },
  });
};

export const addPartnerAddress = (address) => (dispatch) => {
  ////debugger;
  // console.log(accountId);
  dispatch({
    type: types.ADD_PARTNER_ADDRESS,
    payload: {
      address,
    },
  });
};

export const getPartnerPermissionsList = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"partner"}`, {
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

//partner PERMISSION SHARE
// export const sharePartnerPermission = (pageNo, userId, a) => (
//   dispatch,
//   getState
// ) => {
//   // const { userId } = getState("auth").auth.userDetails;
//   dispatch({
//     type: types.ADD_SHARE_PARTNER_PERMISSION_REQUEST,
//   });

//   axios
//     .get(`${base_url}/partner/all-partner/${pageNo}`, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       if (a === "All") {
//         // dispatch(getAllPartnerListByUserId());
//         // dispatch(getRecords(userId));
//       } else {
//         dispatch(getPartnerListByUserId(userId));
//         dispatch(getRecords(userId));
//       }
//       dispatch({
//         type: types.ADD_SHARE_PARTNER_PERMISSION_SUCCESS,
//         payload: res.data,
//       });
//       // cb && cb("success");
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.ADD_SHARE_PARTNER_PERMISSION_FAILURE,
//         payload: err,
//       });
//       // cb && cb("failure");
//     });
// };
export const sharePartnerPermission = (pageNo, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_PARTNER_PERMISSION_REQUEST,
  });

  axios
    .get(`${base_url}/partner/all-partner/${pageNo}`,  {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (a === "All") {
        // dispatch(getAllCandidateListByUserId());
        // dispatch(getRecords(userId));
        // dispatch(getAllRecords(userId));
      } else {
        dispatch(getPartnerListByUserId(userId,0));
        dispatch(getRecords(userId));
      }
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.ADD_SHARE_PARTNER_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_PARTNER_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

/**
 * Status in Partner
 */
export const linkPartnerStatus = (data, partnerId, userId, cb) => (
  dispatch
) => {
  // debugger;
  dispatch({
    type: types.LINK_PARTNER_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/partner/${partnerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.LINK_PARTNER_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PARTNER_STATUS_FAILURE,
        payload: err,
      });
      cb && cb("failuer");
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/partner/record/count/${userId}`, {
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
export const putPartnerContactToggle = (data,contactId) => (dispatch) => {
  dispatch({ type: types.PUT_PARTNER_CONTACT_TOGGLE_REQUEST });

  axios
    .post(`${base_url}/task/convert/contact/${contactId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
     // dispatch(getContactListByPartnerId(partnerId))
      console.log(res);
      dispatch({
        type: types.PUT_PARTNER_CONTACT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PUT_PARTNER_CONTACT_TOGGLE_FAILURE,
      });
    });
};
export const setPartnerViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_PARTNER_VIEW_TYPE,
    payload: viewType,
  });
};
// add commercials of partner
export const addCommercialByOrgId = (data, orgId) => (dispatch) => {
  
  dispatch({
    type: types.ADD_COMMERCIALS_BY_PARTNER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/partner/commission`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCommercialByOrgId(orgId));
      dispatch({
        type: types.ADD_COMMERCIALS_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_COMMERCIALS_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};
// get  commercials of partner
export const getCommercialByOrgId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_COMMERCIALS_BY_PARTNER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/partner/commission/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMERCIALS_BY_PARTNER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMERCIALS_BY_PARTNER_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateOwnerpartnerById= (userId,data) => (dispatch,getState) => {
  const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_PARTNER_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/partner/transfer/${userId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getPartnerListByUserId(userId1));
      dispatch({
        type: types.UPDATE_PARTNER_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PARTNER_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
}; 

// //SEARCH
// export const inputPartnerSearch = (partnerName) => (dispatch) => {
//   dispatch({
//     type: types.INPUT_PARTNER_SEARCH_REQUEST,
//   });
//   axios
//     .get(`${base_url}/partner/details/${partnerName}`, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       if (res.data.partnerId) {
//         console.log(res.data);
//         // dispatch(getAllLatestContactsForLazyLoading(res.data));
//       }

//       dispatch({
//         type: types.INPUT_PARTNER_SEARCH_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: types.INPUT_PARTNER_SEARCH_FAILURE,
//         payload: err,
//       });
//     });
// };
export const handlePartnerReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PARTNER_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};


export const getPartnerPagination = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_PAGINATION_REQUEST,
  });
  axios
    .get(`${base_url}/permission/partner/details/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_PAGINATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNER_PAGINATION_FAILURE,
        payload: err,
      });
    });
};
export const deletePartnerData = ( partnerId,data ) => (dispatch) => {
  dispatch({ type: types.DELETE_PARTNER_DATA_REQUEST });

  axios
    .put(`${base_url}/partner/delete/${partnerId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_PARTNER_DATA_SUCCESS,
        payload:partnerId ,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PARTNER_DATA_FAILURE,
      });
      // cb && cb("failure");
    });
};

// export const deletePartnerData = (partnerId,userId) => (dispatch, getState) => {
//   const { userId } = getState("auth").auth.userDetails;
//   // console.log("inside deleteCall", callId);
//   dispatch({
//     type: types.DELETE_PARTNER_DATA_REQUEST,
//   });
//   axios
//     .put(`${base_url}/partner/delete/${partnerId}`, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       dispatch(getPartnerListByUserId(userId));
//       dispatch({
//         type: types.DELETE_PARTNER_DATA_SUCCESS,
//         payload: partnerId,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.DELETE_PARTNER_DATA_FAILURE,
//         payload: err,
//       });
//     });
// };
export const getDeletedPartner = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_PARTNER_REQUEST,
  });
  axios
    .get(`${base_url}/partner/deleted/partner/list/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_PARTNER_FAILURE,
        payload: err,
      });
    });
};

export const reinstateToggleForLost = (data, partnerId,userId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_LOST_REQUEST,
  });
  axios
    .put(`${base_url}/partner/delete/${partnerId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedPartner(userId,0));
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_LOST_SUCCESS,
        payload: partnerId,
      });
      // message.success("Confirmation Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_LOST_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};
