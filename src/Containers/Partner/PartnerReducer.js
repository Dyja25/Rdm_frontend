import * as types from "./PartnerActionTypes";

const initialState = {
  addPartnerModal: false,
  addingPartner: false,

  fetchingPartners: false,
  fetchingPartnersError: false,
  partnerByUserId: [],

  fetchingPartnersPagination: false,
  fetchingPartnersPaginationError: false,
  partnerPagination:[],

  fetchingAllPartners: false,
  fetchingAllPartnersError: false,
  allpartnerByUserId: [],

  fetchingPartnerContact: false,
  fetchingPartnerContactError: false,
  contactByPartnerId: [],

  documentUploadModal: false,

  addingDocumentByPartnerId: false,
  addingDocumentByPartnerIdError: false,

  fetchingDocumentsByPartnerId: false,
  fetchingDocumentsByPartnerIdError: false,
  documentsByPartnerId: [],

  deleteDocument: false,
  deleteDocumentError: false,


  fetchingDeletedPartner: false,
  fetchingDeletedPartnerError: false,
  deletedPartner: [],

  fetchingNotesListByPartnerId: false,
  fetchingNotesListByPartnerIdError: false,
  notesListByPartnerId: [],

  fetchingPartnerOpportunity: false,
  fetchingPartnerOpportunityError: false,
  opportunityByPartnerId: [],

  fetchingPartnerDetailsById: false,
  fetchingPartnerDetailsByIdError: false,
  partner: {},
  //contactTab
  addPartnerContactModal: false,
  //add contact
  addingPartnerContact: false,
  addingPartnerContactError: false,
  // opportunity
  addPartnerOpportunityModal: false,
  addingPartnerOpportunity: false,
  addingPartnerOpportunityError: false,
  //skills
  fetchingTopicsByPartnerId: false,
  fetchingTopicsByPartnerIdError: false,
  topicsByPartnerId: [],

  fetchingNotesListByPartnerId: false,
  fetchingNotesListByPartnerIdError: false,
  notesListByPartnerId: [],

  deletePartnerData: false, 
  deletePartnerDataError: false,

  updatePartnerModal: false,
  updatePartnerContactModal: false,

  addingNotesByPartnerId:false,
  addingNotesByPartnerIdError:false,

  setEditingPartner: {},

  updatePartnerById: false,
  updatePartnerByIdError: false,

  setEditingPartnerContact: {},

  updatePartnerContactById: false,
  updatePartnerContactByIdError: false,
  partnercontactByUserId:[],

  fetchingPartnerInputSearchData: false,
  fetchingPartnerInputSearchDataError: false,
  inputData: [],

  // fetchingPartnerInputSearch: false,
  // fetchingPartnerInputSearchError: false,
  // inputData: [],

  updatePartnerBankDetailsById: false,
  updatePartnerBankDetailsByIdError: false,

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  reInstateToggleForlost: false,
  reInstateToggleForlostError: false,
  
  //SHARE partner Permission
  addSharingPartner: false,
  addSharingPartnerError: false,

  linkingPartnerStatus: false,
  linkingPartnerStatusError: false,

  
  addPartnerSpeechModal:false,

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  puttingPartnerContcToggle: false,
  puttingPartnerContcToggleError:false,

  viewType: "list",

  fetchingCommercials: false,
  fetchingCommercialsError: false,
  commercials:[],

  updatingPartnerOwenership:false,
  updatingPartnerOwenershipError:false

  
};

export const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    //handle Partner form modal
    case types.HANDLE_PARTNER_MODAL:
      return { ...state, addPartnerModal: action.payload };

      case types.EMPTY_PARTNER_TABLE:
        return { ...state, partnerByUserId:[] };


    case types.ADD_PARTNER_REQUEST:
      return { ...state, addingPartner: true };
    case types.ADD_PARTNER_SUCCESS:
      return {
        ...state,
        addingPartner: false,
        addPartnerModal: false,
        partnerByUserId:[action.payload,...state.partnerByUserId]
      };
    case types.ADD_PARTNER_FAILURE:
      return {
        ...state,
        addingPartner: false,
        addPartnerModal: false,
      };
    //get Partners
    case types.GET_PARTNERS_REQUEST:
      return { ...state, fetchingPartners: true };
    case types.GET_PARTNERS_SUCCESS:
      return {
        ...state,
        fetchingPartners: false,
        partnerByUserId: [
          ...state.partnerByUserId,
          ...action.payload],
        // partnerByUserId: action.payload,
      };
    case types.GET_PARTNERS_FAILURE:
      return {
        ...state,
        fetchingPartners: false,
        fetchingPartnersError: true,
      };

      

    // contact of Partner
    case types.GET_PARTNER_CONTACT_REQUEST:
      return { ...state, fetchingPartnerContact: true };
    case types.GET_PARTNER_CONTACT_SUCCESS:
      return {
        ...state,
        fetchingPartnerContact: false,
        contactByPartnerId: action.payload,
      };
    case types.GET_PARTNER_CONTACT_FAILURE:
      return {
        ...state,
        fetchingPartnerContact: false,
        fetchingPartnerContactError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByPartnerId: state.documentsByPartnerId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /*add/link partner document */
    case types.ADD_PARTNER_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByPartnerId: true,
        addingDocumentByPartnerIdError: false,
      };
    case types.ADD_PARTNER_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByPartnerId: false,
        addingDocumentByPartnerIdError: false,
      };
    case types.ADD_PARTNER_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByPartnerId: false,
        addingDocumentByPartnerIdError: true,
      };

    /*get list of documents of an Partner */
    case types.GET_PARTNER_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByPartnerId: true,
        fetchingDocumentsByPartnerIdError: false,
      };
    case types.GET_PARTNER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByPartnerId: false,
        fetchingDocumentsByPartnerIdError: false,
        documentsByPartnerId: action.payload,
      };
    case types.GET_PARTNER_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByPartnerId: false,
        fetchingDocumentsByPartnerIdError: true,
      };

    /**
     * Partner Notes
     */

    case types.GET_NOTES_LIST_BY_PARTNER_ID_REQUEST:
      return { ...state, fetchingNotesListByPartnerId: true };
    case types.GET_NOTES_LIST_BY_PARTNER_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByPartnerId: false,
        notesListByPartnerId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_PARTNER_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByPartnerId: false,
        fetchingNotesListByPartnerIdError: true,
      };

    /* Get a opportunity  */
    case types.GET_PARTNER_OPPORTUNITY_REQUEST:
      return { ...state, fetchingPartnerOpportunity: true };
    case types.GET_PARTNER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingPartnerOpportunity: false,
        opportunityByPartnerId: action.payload,
      };
    case types.GET_PARTNER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingPartnerOpportunity: false,
        fetchingPartnerOpportunityError: true,
      };

    /* Add a opportunity */
    // case types.ADD_PARTNER_OPPORTUNITY_REQUEST:
    //   return { ...state, addingPartnerOpportunity: true };
    // case types.ADD_PARTNER_OPPORTUNITY_SUCCESS:
    //   return {
    //     ...state,
    //     addingPartnerOpportunity: false,
    //     addOpportunityModal: false,
    //     // clearbit: null,
    //   };
    // case types.ADD_PARTNER_OPPORTUNITY_FAILURE:
    //   return {
    //     ...state,
    //     addingPartnerOpportunity: false,
    //     addingPartnerOpportunityError: true,
    //     addOpportunityModal: false,
    //   };

    //Partner Details
    case types.GET_PARTNER_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingPartnerDetailsById: true };
    case types.GET_PARTNER_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingPartnerDetailsById: false,
        partner: action.payload,
      };
    case types.GET_PARTNER_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingPartnerDetailsById: false,
        fetchingPartnerDetailsByIdError: true,
      };
    //ContactTAB
    //contactModal
    case types.HANDLE_PARTNER_CONTACT_MODAL:
      return { ...state, addPartnerContactModal: action.payload };
    //add contact
    case types.ADD_PARTNER_CONTACT_REQUEST:
      return { ...state, addingPartnerContact: true };
    case types.ADD_PARTNER_CONTACT_SUCCESS:
      return {
        ...state,
        addingPartnerContact: false,
        addPartnerContactModal: false,
      };
    case types.ADD_PARTNER_CONTACT_FAILURE:
      return {
        ...state,
        addingPartnerContact: false,
        addingPartnerContactError: true,
        addPartnerContactModal: false,
      };

    case types.HANDLE_PARTNER_OPPORTUNITY_MODAL:
      return { ...state, addPartnerOpportunityModal: action.payload };
    /* Add a opportunity */
    case types.ADD_PARTNER_OPPORTUNITY_REQUEST:
      return { ...state, addingPartnerOpportunity: true };
    case types.ADD_PARTNER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingPartnerOpportunity: false,
        addPartnerOpportunityModal: false,
        // clearbit: null,
      };
    case types.ADD_PARTNER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingPartnerOpportunity: false,
        addingPartnerOpportunityError: true,
        addPartnerOpportunityModal: false,
      };
    //Add,Edit & Delete Skills

    case types.GET_TOPICS_BY_PARTNER_ID_REQUEST:
      return { ...state, fetchingTopicsByPartnerId: true };
    case types.GET_TOPICS_BY_PARTNER_ID_SUCCESS:
      return {
        ...state,
        fetchingTopicsByPartnerId: false,
        topicsByPartnerId: action.payload,
      };
    case types.GET_TOPICS_BY_PARTNER_ID_FAILURE:
      return {
        ...state,
        fetchingTopicsByPartnerId: false,
        fetchingTopicsByPartnerIdError: true,
      };

    case types.ADD_TOPIC_BY_PARTNER_ID_REQUEST:
      return { ...state, addingTopicByPartnerId: true };
    case types.ADD_TOPIC_BY_PARTNER_ID_SUCCESS:
      // console.clear()
      // console.log(action.payload)
      return {
        ...state,
        addingTopicByPartnerId: false,
        topicsByPartnerId: [...state.topicsByPartnerId, action.payload],
      };
    case types.ADD_TOPIC_BY_PARTNER_ID_FAILURE:
      return {
        ...state,
        addingTopicByPartnerId: false,
        addingTopicByPartnerIdError: true,
      };

    case types.DELETE_TOPIC_BY_PARTNER_ID_REQUEST:
      return { ...state, deletingTopicByPartnerId: true };
    case types.DELETE_TOPIC_BY_PARTNER_ID_SUCCESS:
      return { ...state, deletingTopicByPartnerId: false };
    case types.DELETE_TOPIC_BY_PARTNER_ID_FAILURE:
      return {
        ...state,
        deletingTopicByPartnerId: false,
        deletingTopicByPartnerIdError: true,
      };

    /**
    * Partner Notes
    */

    case types.GET_NOTES_LIST_BY_PARTNER_ID_REQUEST:
      return { ...state, fetchingNotesListByPartnerId: true };
    case types.GET_NOTES_LIST_BY_PARTNER_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByPartnerId: false,
        notesListByPartnerId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_PARTNER_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByPartnerId: false,
        fetchingNotesListByPartnerIdError: true,
      };

    case types.HANDLE_UPDATE_PARTNER_MODAL:
      return { ...state, updatePartnerModal: action.payload };

    case types.SET_PARTNER_EDIT:
      return { ...state, setEditingPartner: action.payload };

    case types.UPDATE_PARTNER_BY_ID_REQUEST:
      return { ...state, updatePartnerById: true };
    case types.UPDATE_PARTNER_BY_ID_SUCCESS:
      return {
        ...state,
        updatePartnerById: false,
        updatePartnerModal: false,
        partnerByUserId: state.partnerByUserId.map((item) => {
          if (item.partnerId === action.payload.partnerId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PARTNER_BY_ID_FAILURE:
      return {
        ...state,
        updatePartnerById: false,
        updatePartnerByIdError: true,
      };


    case types.HANDLE_UPDATE_PARTNER_CONTACT_MODAL:
      return { ...state, updatePartnerContactModal: action.payload };

    case types.SET_PARTNER_CONTACT_EDIT:
      return { ...state, setEditingPartnerContact: action.payload };

    case types.UPDATE_PARTNER_CONTACT_BY_ID_REQUEST:
      return { ...state, updatePartnerContactById: true };
    case types.UPDATE_PARTNER_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        updatePartnerContactById: false,
        updatePartnerContactModal: false,
        partnercontactByUserId: state.partnercontactByUserId.map((item) => {
          if (item.partnerId === action.payload.partnerId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PARTNER_CONTACT_BY_ID_FAILURE:
      return {
        ...state,
        updatePartnerContactById: false,
        updatePartnerContactByIdError: true,
      };
    //SEARCH
    case types.INPUT_PARTNER_SEARCH_DATA_REQUEST:
      return { ...state, fetchingPartnerInputSearchData: true };
    case types.INPUT_PARTNER_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingPartnerInputSearchData: false,
        partnerByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_PARTNER_SEARCH_DATA_FAILURE:
      return { ...state, fetchingPartnerInputSearchDataError: true };

    case types.UPDATE_PARTNER_BANK_DETAILS_BY_ID_REQUEST:
      return { ...state, updatePartnerBankDetailsById: true };
    case types.UPDATE_PARTNER_BY_ID_SUCCESS:
      return {
        ...state,
        updatePartnerBankDetailsById: false,
      };
    case types.UPDATE_PARTNER_BANK_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        updatePartnerBankDetailsById: false,
        updatePartnerBankDetailsByIdError: true,
      };

    case types.UPDATE_PARTNER_ADDRESS:
      return {
        ...state,
        partner: {
          ...state.partner,
          address: state.partner.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };

    case types.ADD_PARTNER_ADDRESS:
      ////debugger;
      return {
        ...state,
        partner: {
          ...state.partner,
          address: action.payload.address,
        },
      };


    case types.GET_PERMISSIONS_LIST_REQUEST:
      return { ...state, fetchingPermissionsList: true };
    case types.GET_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        fetchingPermissionsList: false,
        permissionsDataList: action.payload,
      };
    case types.GET_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        fetchingPermissionsList: false,
        fetchingPermissionsListError: false,
      };

    //SHARE partner Permissiom
    case types.ADD_SHARE_PARTNER_PERMISSION_REQUEST:
      return { ...state, addSharingPartner: true };

    case types.ADD_SHARE_PARTNER_PERMISSION_SUCCESS:
      return { ...state, 
        addSharingPartner: false,
         partnerByUserId: action.payload,
         };

    case types.ADD_SHARE_PARTNER_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingPartner: false,
        addSharingPartnerError: true,
      };

    case types.LINK_PARTNER_STATUS_REQUEST:
      return { ...state, linkingPartnerStatus: true };
    case types.LINK_PARTNER_STATUS_SUCCESS:
      return {
        ...state,
        linkingPartnerStatus: false,
        // addTeamTransferModal: false,
      };
    case types.LINK_PARTNER_STATUS_FAILURE:
      return {
        ...state,
        linkingPartnerStatus: false,
        linkingPartnerStatusError: true,
      };


    //get Partners
    case types.GET_PARTNERS_ALL_REQUEST:
      return { ...state, fetchingAllPartners: true };
    case types.GET_PARTNERS_ALL_SUCCESS:
      return {
        ...state,
        fetchingAllPartners: false,
        allpartnerByUserId: action.payload,
      };
    case types.GET_PARTNERS_ALL_FAILURE:
      return {
        ...state,
        fetchingAllPartners: false,
        fetchingAllPartnersError: true,
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

        case types.PUT_PARTNER_CONTACT_TOGGLE_REQUEST:
          return {
            ...state,
            puttingPartnerContcToggle: true,
          };
        case types.PUT_PARTNER_CONTACT_TOGGLE_SUCCESS:
          return {
            ...state,
            puttingPartnerContcToggle: false,
            contactByCustomerId:state.contactByCustomerId.map((item)=>{
              if(item.partnerId === action.payload.partnerId){
                return {...item,instockInd:action.payload.instockInd}
              }
              else{
                return item
              }
    
            })
          };
        case types.PUT_PARTNER_CONTACT_TOGGLE_FAILURE:
          return {
            ...state,
            puttingPartnerContcToggle: false,
            puttingPartnerContcToggleError: true,
          };
        
  case types.SET_PARTNER_VIEW_TYPE:
            return { ...state, viewType: action.payload };
   
  

// GET Partner Commercials DETAILS
case types.GET_COMMERCIALS_BY_PARTNER_ID_REQUEST:
  return { ...state, fetchingCommercials: true };
case types.GET_COMMERCIALS_BY_PARTNER_ID_SUCCESS:
  return {
    ...state,
    fetchingCommercials: false,
    commercials: action.payload,
  };
case types.GET_COMMERCIALS_BY_PARTNER_ID_FAILURE:
  return {
    ...state,
    fetchingCommercials: false,
    fetchingCommercialsError: true,
  };
 //ADD Partner Commercials DETAILS

 case types.ADD_COMMERCIALS_BY_PARTNER_ID_REQUEST:
  return { ...state, addingCommercials: true };
case types.ADD_COMMERCIALS_BY_PARTNER_ID_SUCCESS:
  return {
    ...state,
    addingCommercials: false,   
  };
case types.ADD_COMMERCIALS_BY_PARTNER_ID_FAILURE:
  return {
    ...state,
    addingCommercials: false,
    addingCommercialsError: true,
  };

  case types.UPDATE_PARTNER_OWNERSHIP_REQUEST:
    return { ...state, updatingPartnerOwenership: true };
  case types.UPDATE_PARTNER_OWNERSHIP_SUCCESS:
    return {
      ...state,
      updatingPartnerOwenership: false,
      // updateCandidateEmploymentModal: false,
      // employmentDetails: state.employmentDetails.map((employment, i) => {
      //   if (employment.id === action.payload.id) {
      //     return action.payload;
      //   } else {
      //     return employment;
      //   }
      // }),
      partnerPagination:state.partnerPagination.filter(
        (employment)=>{
          console.log("abc",employment,action.payload);

        return !action.payload.includes(employment.partnerId)  
        }
      )
    };
  case types.UPDATE_PARTNER_OWNERSHIP_FAILURE:
    return {
      ...state,
      updatingPartnerOwenership: false,
      updatingPartnerOwenershipError: true,
    };

    // //SEARCH
    // case types.INPUT_PARTNER_SEARCH_REQUEST:
    //   return { ...state, fetchingPartnerInputSearch: true };
    // case types.INPUT_PARTNER_SEARCH_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingPartnerInputSearch: false,
    //     partnerByUserId: action.payload,
    //     // serachedData: action.payload,
    //   };
    // case types.INPUT_PARTNER_SEARCH_FAILURE:
    //   return { ...state, fetchingPartnerInputSearchError: true };
    case types.HANDLE_PARTNER_REACT_SPEECH_MODAL:
      return { ...state, addPartnerSpeechModal: action.payload };

      case types.ADD_PARTNER_NOTES_REQUEST:
        return {
          ...state,
          addingNotesByPartnerId: true,          
        };
      case types.ADD_PARTNER_NOTES_SUCCESS:
        return {
          ...state,
          addingNotesByPartnerId: false,
          addingNotesByPartnerIdError: false,
          addPartnerSpeechModal:false,
        };
      case types.ADD_PARTNER_NOTES_FAILURE:
        return {
          ...state,
          addingNotesByPartnerId: false,
          addingNotesByPartnerIdError: true,
        };


        case types.GET_PARTNER_PAGINATION_REQUEST:
          return { ...state, fetchingPartnersPagination: true };
        case types.GET_PARTNER_PAGINATION_SUCCESS:
          return {
            ...state,
            fetchingPartnersPagination: false,
            // partnerPagination: [
            //   ...state.partnerPagination,
            //   ...action.payload],
            partnerByUserId:action.payload,
          };
        case types.GET_PARTNER_PAGINATION_FAILURE:
          return {
            ...state,
            fetchingPartnersPagination: false,
            fetchingPartnersPaginationError: true,
          };


          case types.DELETE_PARTNER_DATA_REQUEST:
            return { ...state, deletePartnerData: true };
          case types.DELETE_PARTNER_DATA_SUCCESS:
            return {
              ...state,
              deletePartnerData: false,

              partnerByUserId: state.partnerByUserId.filter(
                (item) => item.partnerId !== action.payload
              ),
            };
          case types.DELETE_PARTNER_DATA_FAILURE:
            return { ...state, deletePartnerData: false, deletePartnerDataError: false };


            case types.GET_DELETED_PARTNER_REQUEST:
              return { ...state, fetchingDeletedPartner: true };
            case types.GET_DELETED_PARTNER_SUCCESS:
              return {
                ...state,
                fetchingDeletedPartner: false,
                deletedPartner: action.payload,
                // partnerByUserId: [
                //   ...state.partnerByUserId,
                //   ...action.payload],
                // partnerByUserId: state.partnerByUserId.filter(
                //   (item) => item.partnerId !== action.payload
                // ),
              };
            case types.GET_DELETED_PARTNER_FAILURE:
              return {
                ...state,
                fetchingDeletedPartner: false,
                fetchingDeletedPartnerError: true,
              };

              case types.REINSTATE_TOGGLE_FOR_LOST_REQUEST:
                return { ...state, reInstateToggleForlost: true };
           case types.REINSTATE_TOGGLE_FOR_LOST_SUCCESS:
          return {
            ...state,
            reInstateToggleForlost: false,
            deletedPartner: state.deletedPartner.filter(
              (item) => item.partnerId !== action.payload
           ),
         };
       case types.REINSTATE_TOGGLE_FOR_LOST_FAILURE:
           return {
            ...state,
            reInstateToggleForlost: false,
            reInstateToggleForlostError: true,
          };


default:
  return state;
}
};
