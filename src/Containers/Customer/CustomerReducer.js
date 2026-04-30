import * as types from "./CustomerActionTypes";
const initialState = {
  viewType: "table",
  addCustomerModal: false,

  addingCustomer: false,
  addingCustomerError: false,

  addingAttendence: false,
  addingAttendenceError: false,

  fetchingCustomerRecruit:false,
  fetchingCustomerRecruitError:false,
  customerRecruit:[],

  reInstateToggleForCustomer: false,
  reInstateToggleForCustomerError: false,

  fetchingCustomerDeleteData: false,
  fetchingCustomerDeleteDataError: false,
  customerDeleteData:[],

  fetchingRecordsDelete: false,
  fetchingRecordsDeleteError: false,
  recordDataDelete:{},

  addingCustomerContact: false,
  addingCustomerContactError: false,
  addCustomerContactModal: false,

  fetchingCustomers: false,
  fetchingCustomersError: false,
  customerByUserId: [],

  fetchingAllCustomers: false,
  fetchingAllCustomersError: false,
  allcustomersByUserId: [],

  fetchingCustomerById: false,
  fetchingCustomerByIdError: false,
  customerById: [],

  fetchingCustomerDetailsById: false,
  fetchingCustomerDetailsByIdError: false,
  customer: {},

  documentUploadModal: false,

  addingDocumentByCustomerId: false,
  addingDocumentByCustomerIdError: false,

  fetchingDocumentsByCustomerId: false,
  fetchingDocumentsByCustomerIdError: false,
  documentsByCustomerId: [],

  deleteDocument: false,
  deleteDocumentError: false,

  addCustomerSpeechModal:false,

  deleteCustomerData: false,
  deleteCustomerDataError: false,

  fetchingNotesListByCustomerId: false,
  fetchingNotesListByCustomerIdError: false,
  notesListByCustomerId: [],

  updateCustomerModal: false,

  setEditingCustomer: {},

  updateCustomerById: false,
  updateCustomerByIdError: false,

  fetchingCustomerOpportunity: false,
  fetchingCustomerOpportunityError: false,
  opportunityByCustomerId: [],

  fetchingCustomerContact: false,
  fetchingCustomerContactError: false,
  contactByCustomerId: [],

  fetchingCommercialsByCustomer: false,
  fetchingCommercialsByCustomerError: false,
  commercialsByCustomerId:[],

  addingCommercials: false,
  addingCommercialsError: false,

  addingCustomerOpportunity: false,
  addingCustomerOpportunityError: false,
  addingCustomerOpportunityModal: false,

  addingInvoice: false,
  addingInvoiceError: false,

  fetchingInvoiceByCustomer: false,
fetchingInvoiceByCustomerError: false,
invoiceByCustomerId:[],

  //search
  fetchingCustomerInputSearchData: false,
  fetchingCustomerInputSearchDataError: false,
  inputData: [],

  deleteContactData:false,
  deleteContactDataError:false,

  addingNotesByCustomerId:false,
  addingNotesByCustomerIdError:false,

  //SHARE Contact Permission of customer
  addSharingCustomer: false,
  addSharingCustomerError: false,

  fetchingPermissionsListCustomer: false,
  fetchingPermissionsListCustomerError: false,
  permissionsDataListCustomer: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  addRecruitModal: false,

  addFileRecruitModal: false,

  addTagProfileModal: false,

  linkingRecruitToCustomer: false,
  linkingRecruitToCustomerError: false,

  fetchingRecruitToCustomer: false,
  fetchingRecruitToCustomerError: false,
  recruitByCustomerId: [],

  linkingProfileToCustomer: false,
  linkingProfileToCustomerError: false,
  profileRecruit: [],

  addingRecruitmentProfile: false,
  addingRecruitmentProfileError: false,

  currentRecruitmentData: {},
  addSponsorModal: false,

  updatingCustomerOpportunity: false,
  updatingCustomerOpportunityError: false,
  addCustomerOpportunityModal: false,
  customeropportunityByUserId: [],
  addUpdateCustomerOpportunityModal: false,
  setEditingCustomerOpportunity: {},

  puttingCustContcToggle: false,
  puttingCustContcToggleError: false,

  fetchingCustomersCategory: false,
  fetchingCustomersCategoryError: false,
  customerByCategory: [],

  fetchingCategoryRecords: false,
  fetchingCategoryRecordsError: false,
  recordCategoryData: "",
  recordCategoryDataBlue: "",

  updatingCustomerOwenership:false,
  updatingCustomerOwenershipError:false


};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * handle Customer form modal
     */
    case types.HANDLE_CUSTOMER_MODAL:
      return { ...state, addCustomerModal: action.payload };
    case types.HANDLE_CUSTOMER_CONTACT_MODAL:
      return { ...state, addCustomerContactModal: action.payload };

    case types.ADD_CUSTOMER_REQUEST:
      return { ...state, addingCustomer: true };
    case types.ADD_CUSTOMER_SUCCESS:
      return { ...state, addingCustomer: false, addCustomerModal: false };
    case types.ADD_CUSTOMER_FAILURE:
      return { ...state, addingCustomer: false, addCustomerModal: false };

    case types.GET_CUSTOMERS_REQUEST:
      return { ...state, fetchingCustomers: true };
    case types.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetchingCustomers: false,
        customerByUserId: action.payload,
      };
    case types.GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        fetchingCustomers: false,
        fetchingCustomersError: true,
      };

    case types.GET_CUSTOMER_BY_ID_REQUEST:
      return { ...state, fetchingCustomerById: true };
    case types.GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingCustomerById: false,
        customerById: action.payload,
      };
    case types.GET_CUSTOMER_BY_ID_FAILURE:
      return {
        ...state,
        fetchingCustomerById: false,
        fetchingCustomerByIdError: true,
      };

    //Customer Details
    case types.GET_CUSTOMER_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingCustomerDetailsById: true };
    case types.GET_CUSTOMER_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingCustomerDetailsById: false,
        customer: action.payload,
      };
    case types.GET_CUSTOMER_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingCustomerDetailsById: false,
        fetchingCustomerDetailsByIdError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };
      case types.HANDLE_INVOICE_MODAL:
        return { ...state, invoiceModal: action.payload };
    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByCustomerId: state.documentsByCustomerId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /**
     * Customer Notes
     */

    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST:
      return { ...state, fetchingNotesListByCustomerId: true };
    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByCustomerId: false,
        notesListByCustomerId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByCustomerId: false,
        fetchingNotesListByCustomerIdError: true,
      };

    case types.HANDLE_UPDATE_CUSTOMER_MODAL:
      return { ...state, updateCustomerModal: action.payload };

    case types.SET_CUSTOMER_EDIT:
      return { ...state, setEditingCustomer: action.payload };

    case types.UPDATE_CUSTOMER_BY_ID_REQUEST:
      return { ...state, updateCustomerById: true };
    case types.UPDATE_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        updateCustomerById: false,
        updateCustomerModal: false,
        customerByUserId: state.customerByUserId.map((item) => {
          if (item.customerId === action.payload.customerId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CUSTOMER_BY_ID_FAILURE:
      return {
        ...state,
        updateCustomerById: false,
        updateCustomerByIdError: true,
      };

    /*add/link customer document */
    case types.ADD_CUSTOMER_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByCustomerId: true,
        addingDocumentByCustomerIdError: false,
      };
    case types.ADD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByCustomerId: false,
        addingDocumentByCustomerIdError: false,
      };
    case types.ADD_CUSTOMER_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByCustomerId: false,
        addingDocumentByCustomerIdError: true,
      };

    /*get list of documents of an Customer */
    case types.GET_CUSTOMER_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByCustomerId: true,
        fetchingDocumentsByCustomerIdError: false,
      };
    case types.GET_CUSTOMER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByCustomerId: false,
        fetchingDocumentsByCustomerIdError: false,
        documentsByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByCustomerId: false,
        fetchingDocumentsByCustomerIdError: true,
      };


      case types.DELETE_CONTACT_DATA_REQUEST:
                              return { ...state, deleteContactData: true };
                            case types.DELETE_CONTACT_DATA_SUCCESS:
                              return {
                                ...state,
                                deleteContactData: false,
                              
                              contactByCustomerId:
        
          state.contactByCustomerId.filter(
              (item) => item.contactId !== action.payload
            )
        
      
   
                              };
                            case types.DELETE_CONTACT_DATA_FAILURE:
                              return { ...state, deleteContactData: false, deleteContactDataError: false };

    /* Get customer opportunity  */
    case types.GET_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, fetchingCustomerOpportunity: true };
    case types.GET_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingCustomerOpportunity: false,
        opportunityByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingCustomerOpportunity: false,
        fetchingCustomerOpportunityError: true,
      };

    /* Get a opportunity  */
    case types.GET_CUSTOMER_CONTACT_REQUEST:
      return { ...state, fetchingCustomerContact: true };
    case types.GET_CUSTOMER_CONTACT_SUCCESS:
      return {
        ...state,
        fetchingCustomerContact: false,
        contactByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_CONTACT_FAILURE:
      return {
        ...state,
        fetchingCustomerContact: false,
        fetchingCustomerContactError: true,
      };

    //add contact
    case types.ADD_CUSTOMER_CONTACT_REQUEST:
      return { ...state, addingCustomerContact: true };
    case types.ADD_CUSTOMER_CONTACT_SUCCESS:
      return {
        ...state,
        addingCustomerContact: false,
        addCustomerContactModal: false,
      };
    case types.ADD_CUSTOMER_CONTACT_FAILURE:
      return {
        ...state,
        addingCustomerContactError: false,
        addCustomerContactModal: false,
      };

    /* handle Customer Opportunity form modal */
    case types.HANDLE_CUSTOMER_OPPORTUNITY_MODAL:
      return { ...state, addCustomerOpportunityModal: action.payload };

      case types.HANDLE_CUSTOMER_REACT_SPEECH_MODAL:
        return { ...state, addCustomerSpeechModal: action.payload };

    case types.HANDLE_UPDATE_CUSTOMER_OPPORTUNITY_MODAL:
      return { ...state, addUpdateCustomerOpportunityModal: action.payload };

    /* Add a customer opportunity */
    case types.ADD_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, addingCustomerOpportunity: true };
    case types.ADD_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingCustomerOpportunity: false,
        addCustomerOpportunityModal: false,
        // clearbit: null,
      };
    case types.ADD_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingCustomerOpportunity: false,
        addingCustomerOpportunityError: true,
        addingCustomerOpportunityModal: false,
      };

    //SEARCH
    case types.INPUT_CUSTOMER_SEARCH_DATA_REQUEST:
      return { ...state, fetchingCustomerInputSearchData: true };
    case types.INPUT_CUSTOMER_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingCustomerInputSearchData: false,
        customerByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_CUSTOMER_SEARCH_DATA_FAILURE:
      return { ...state, fetchingCustomerInputSearchDataError: true };


    //SHARE Contact Customer Permissiom
    case types.ADD_SHARE_CUSTOMER_PERMISSION_REQUEST:
      return { ...state, addSharingCustomer: true };

    case types.ADD_SHARE_CUSTOMER_PERMISSION_SUCCESS:
      return { ...state, addSharingCustomer: false, customerByUserId: action.payload };

    case types.ADD_SHARE_CUSTOMER_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingCustomer: false,
        addSharingCustomerError: true,
      };


    case types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST:
      return { ...state, fetchingPermissionsListCustomer: true };
    case types.GET_PERMISSIONS_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingPermissionsListCustomer: false,
        permissionsDataListCustomer: action.payload,
      };
    case types.GET_PERMISSIONS_LIST_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingPermissionsListCustomer: false,
        fetchingPermissionsListCustomerError: false,
      };

    //get All Customers
    case types.GET_ALL_CUSTOMERS_REQUEST:
      return { ...state, fetchingAllCustomers: true };
    case types.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetchingAllCustomers: false,
        customerByUserId: action.payload,
      };
    case types.GET_ALL_CUSTOMERS_FAILURE:
      return {
        ...state,
        fetchingAllCustomers: false,
        fetchingAllCustomersError: true,
      };

    case types.GET_RECORDS_REQUEST:
      return { ...state, fetchingRecordsByUserId: true };
    case types.GET_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        recordData: action.payload,
      };
    case types.GET_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        fetchingRecordsByUserIdError: true,
      };

      case types.GET_RECORDS_DELETE_REQUEST:
      return { ...state, fetchingRecordsDelete: true };
    case types.GET_RECORDS_DELETE_SUCCESS:
      return {
        ...state,
        fetchingRecordsDelete: false,
        recordDataDelete: action.payload,
      };
    case types.GET_RECORDS_DELETE_FAILURE:
      return {
        ...state,
        fetchingRecordsDelete: false,
        fetchingRecordsDeleteError: true,
      };

    // Add Recruit Modal
    case types.HANDLE_RECRUIT_MODAL:
      return { ...state, addRecruitModal: action.payload };

    // Add Profile Modal
    case types.HANDLE_TAGPROFILE_MODAL:
      return { ...state, addTagProfileModal: action.payload };



    //add recruit
    case types.LINK_RECRUIT_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        linkingRecruitToCustomer: true,
      };
    case types.LINK_RECRUIT_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        linkingRecruitToCustomer: false,

        addRecruitModal: false,
      };
    case types.LINK_RECRUIT_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        linkingRecruitToCustomer: false,
        linkingRecruitToCustomerError: true,
      };

    //get recruit
    case types.GET_RECRUIT_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        fetchingRecruitToCustomer: true,
      };
    case types.GET_RECRUIT_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingRecruitToCustomer: false,
        recruitByCustomerId: action.payload,
      };
    case types.GET_RECRUIT_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingRecruitToCustomer: false,
        fetchingRecruitToCustomerError: true,
      };


    case types.LINK_PROFILE_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        linkingProfileToCustomer: true,
      };

    case types.LINK_PROFILE_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        linkingProfileToCustomer: false,
        profileRecruit: action.payload,
      };

    case types.LINK_PROFILE_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        linkingProfileToCustomer: false,
        linkingProfileToCustomerError: true,
      };

    case types.ADD_RECRUITMENT_PROFILE_REQUEST:
      return {
        ...state,
        addingRecruitmentProfile: true,
      };
    case types.ADD_RECRUITMENT_PROFILE_SUCCESS:
      return {
        ...state,
        addingRecruitmentProfile: false,
        addTagProfileModal: false,
      };
    case types.ADD_RECRUITMENT_PROFILE_FAILURE:
      return {
        ...state,
        addingRecruitmentProfile: false,
        addingRecruitmentProfileError: true,
      };

    case types.SET_CURRENT_RECRUITMENT_DATA:
      return { ...state, currentRecruitmentData: action.payload };

    case types.HANDLE_SELECT_SPONSOR_MODAL:
      return { ...state, addSponsorModal: action.payload };

    case types.UPDATE_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, updatingCustomerOpportunity: true };
    case types.UPDATE_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        updatingCustomerOpportunity: false,
        // addCustomerOpportunityModal: false,
        addUpdateCustomerOpportunityModal: false,
        customeropportunityByUserId: state.customeropportunityByUserId.map((opportunity) => {
          if (opportunity.customerId === action.payload.customerId) {
            return action.payload;
          } else {
            return opportunity;
          }
        }),
      };

    case types.UPDATE_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        updatingCustomerOpportunity: true,
        updatingCustomerOpportunityError: false,
        // addCustomerOpportunityModal: false,
      };

    case types.SET_EDIT_CUSTOMER_OPPORTUNITY:
      return { ...state, setEditingCustomerOpportunity: action.payload };
    // Add File Recruit Modal
    case types.HANDLE_FILE_RECRUIT_MODAL:
      return { ...state, addFileRecruitModal: action.payload };

    case types.ADD_ATTENDENCE_REQUEST:
      return { ...state, addingAttendence: true };
    case types.ADD_ATTENDENCE_SUCCESS:
      return { ...state, addingAttendence: false, };
    case types.ADD_ATTENDENCE_FAILURE:
      return { ...state, addingAttendence: false, };

    case types.PUT_CUSTO_CONTACT_TOGGLE_REQUEST:
      return {
        ...state,
        puttingCustContcToggle: true,
      };
    case types.PUT_CUSTO_CONTACT_TOGGLE_SUCCESS:
      return {
        ...state,
        puttingCustContcToggle: false,
        contactByCustomerId: state.contactByCustomerId.map((item) => {
          if (item.customerId === action.payload.customerId) {
            return { ...item, instockInd: action.payload.instockInd }
          }
          else {
            return item
          }

        })
      };
    case types.PUT_CUSTO_CONTACT_TOGGLE_FAILURE:
      return {
        ...state,
        puttingCustContcToggle: false,
        puttingCustContcToggleError: true,
      };

    case types.SET_CUSTOMER_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_CUSTOMERS_BY_CATEGORY_REQUEST:
      return { ...state, fetchingCustomersCategory: true };
    case types.GET_CUSTOMERS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingCustomersCategory: false,
        customerByCategory: action.payload,
      };
    case types.GET_CUSTOMERS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingCustomersCategory: false,
        fetchingCustomersCategoryError: true,
      };

    case types.GET_CATEGORY_RECORDS_REQUEST:
      return { ...state, fetchingCategoryRecords: true };
    case types.GET_CATEGORY_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCategoryRecords: false,
        recordCategoryData: action.payload,
      };
    case types.GET_CATEGORY_RECORDS_BLUE_SUCCESS:
      return {
        ...state,
        fetchingCategoryRecords: false,
        recordCategoryDataBlue: action.payload,
      };
    case types.GET_CATEGORY_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCategoryRecords: false,
        fetchingCategoryRecordsError: true,
      };
        
      //ADD COMMERCIALS

      case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_REQUEST:
                  return {
                    ...state,
                    addingCommercials: true,
                  };
                case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS:
                  return {
                    ...state,
                    addingCommercials: false,
                  };
                case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_FAILURE:
                  return {
                    ...state,
                    addingCommercials: false,
                    addingCommercialsError: true,
                  };
      // GET CUSTOMER COMMERCIALS DETAILS
      case types.GET_COMMERCIALS_BY_CUSTOMER_ID_REQUEST:
        return { ...state,
           fetchingCommercialsByCustomer: true };
      case types.GET_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS:
        return {
          ...state,
          fetchingCommercialsByCustomer: false,
          commercialsByCustomerId: action.payload,
        };
      case types.GET_COMMERCIALS_BY_CUSTOMER_ID_FAILURE:
        return {
          ...state,
          fetchingCommercialsByCustomer: false,
          fetchingCommercialsByCustomerError: true,
        };


        //ADD INVOICE

      case types.ADD_INVOICE_BY_CUSTOMER_ID_REQUEST:
        return {
          ...state,
          addingInvoice: true,
        };
      case types.ADD_INVOICE_BY_CUSTOMER_ID_SUCCESS:
        return {
          ...state,
          addingInvoice: false,
        };
      case types.ADD_INVOICE_BY_CUSTOMER_ID_FAILURE:
        return {
          ...state,
          addingInvoice: false,
          addingInvoiceError: true,
        };
// GET INVOICE DETAILS
case types.GET_INVOICE_BY_CUSTOMER_ID_REQUEST:
return { ...state,
 fetchingInvoiceByCustomer: true };
case types.GET_INVOICE_BY_CUSTOMER_ID_SUCCESS:
return {
...state,
fetchingInvoiceByCustomer: false,
invoiceByCustomerId: action.payload,
};
case types.GET_INVOICE_BY_CUSTOMER_ID_FAILURE:
return {
...state,
fetchingInvoiceByCustomer: false,
fetchingInvoiceByCustomerError: true,
};

case types.UPDATE_CUSTOMER_OWNERSHIP_REQUEST:
  return { ...state, updatingCustomerOwenership: true };
case types.UPDATE_CUSTOMER_OWNERSHIP_SUCCESS:
  return {
    ...state,
    updatingCustomerOwenership: false,
    // updateCandidateEmploymentModal: false,
    employmentDetails: state.employmentDetails.map((employment, i) => {
      if (employment.id === action.payload.id) {
        return action.payload;
      } else {
        return employment;
      }
    }),
  };
case types.UPDATE_CUSTOMER_OWNERSHIP_SUCCESS:
  return {
    ...state,
    updatingCustomerOwenership: false,
    updatingCustomerOwenershipError: true,
  };

  case types.ADD_CUSTOMER_NOTES_REQUEST:
    return {
      ...state,
      addingNotesByCustomerId: true,          
    };
  case types.ADD_CUSTOMER_NOTES_SUCCESS:
    return {
      ...state,
      addingNotesByCustomerId: false,
      addingNotesByCustomerId: false,
      addCustomerSpeechModal:false,
    };
  case types.ADD_CUSTOMER_NOTES_FAILURE:
    return {
      ...state,
      addingNotesByCustomerId: false,
      addingNotesByContactIdError: true,
    };


    case types.GET_CUSTOMER_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingCustomerRecruit: true,
      };
    case types.GET_CUSTOMER_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingCustomerRecruit: false,
        customerRecruit: action.payload,
      };
    case types.GET_CUSTOMER_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingCustomerRecruit: false,
        fetchingCustomerRecruitError: true,
      };

      case types.GET_CUSTOMER_DELETE_DATA_REQUEST:
      return {
        ...state,
        fetchingCustomerDeleteData: true,
      };
    case types.GET_CUSTOMER_DELETE_DATA_SUCCESS:
      return {
        ...state,
        fetchingCustomerDeleteData: false,
        customerDeleteData: action.payload,
      };
    case types.GET_CUSTOMER_DELETE_DATA_FAILURE:
      return {
        ...state,
        fetchingCustomerDeleteData: false,
        fetchingCustomerDeleteDataError: true,
      };

       case types.DELETE_CUSTOMER_DATA_REQUEST:
                  return { ...state, deleteCustomerData: true };
                case types.DELETE_CUSTOMER_DATA_SUCCESS:
                  return {
                    ...state,
                    deleteCustomerData: false,
                  
                    customerByUserId: state.customerByUserId.filter(
                      (item) => item.customerId !== action.payload
                    ),
                    customerByCategory: state.customerByCategory.filter(
                      (item) => item.customerId !== action.payload
                    ),
                  };
                case types.DELETE_CUSTOMER_DATA_FAILURE:
                  return { ...state, 
                    deleteCustomerData: false,
                    deleteCustomerDataError: false };

 case types.REINSTATE_TOGGLE_FOR_CUSTOMER_REQUEST:
                return { ...state, reInstateToggleForCustomer: true };
           case types.REINSTATE_TOGGLE_FOR_CUSTOMER_SUCCESS:
          return {
            ...state,
            reInstateToggleForCustomer: false,
            customerDeleteData: state.customerDeleteData.filter(
              (item) => item.customerId !== action.payload
           ),
         };
       case types.REINSTATE_TOGGLE_FOR_CUSTOMER_FAILURE:
           return {
            ...state,
            reInstateToggleForCustomer: false,
            reInstateToggleForCustomerError: true,
          };



default:
return state;
}
};



  

   








