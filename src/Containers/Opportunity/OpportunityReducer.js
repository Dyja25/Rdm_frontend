import * as types from "./OpportunityActionTypes";
const initialState = {
  viewType: "table",

  addOpportunityModal: false,
  addRecruiterModal:false,

    //email stage
    emailingStage: false,
    emailingStageError: false,

  addingWebsite: false,
  addingWebsiteError: false,

  fetchingRecruiterRequirement:false,
  fetchingRecruiterRequirementError:false,
  recruiterRequirement:[],


  // unpublishSummary: false,
  // unpublishSummaryError: false,

  addRemarksModal: false,
  addRequirementDetailModal:false,
  setAddRequirement:{},

  addSentimentModal:false,

  addingOpportunity: false,
  addingOpportunityError: false,

  fetchingOpportunity: false,
  fetchingOpportunityError: false,
  opportunityByUserId: [],

  fetchingAllOpportunities: false,
  fetchingAllOpportunitiesError: false,
  allopportunitiesByUserId: [],

  currentOpportunityRecruitmentData: null,
  currentRecruiterData: {},

  updateRemarkModal:false,

  // publishSummary: false,
  // publishSummaryError: false,


  fetchingOpportunityDetailsById: false,
  fetchingOpportunityDetailsByIdError: false,
  opportunity: {},

  documentUploadModal: false,
  addSponsorModal: false,

  fetchingNotesListByOpportunityId: false,
  fetchingNotesListByOpportunityIdError: false,
  notesListByOpportunityId: [],

  fetchingAllRecruitmentPositionByOppId: false,
  fetchingAllRecruitmentPositionByOppIdError: false,
  allRecruitmentPositionByOppId: "",

  fetchingSkillsCount: false,
  fetchingSkillsCountError: true,
  skillsCount: [],

  setEditingRemark: {},

  addRecruitModal: false,

  addCustomerModal: false,

  addingSentiment:false,
  addingSentimentError:false,
  sentiment:{},

  addTagProfileModal: false,

  updateOpportunityModal: false,

  setEditingOpportunity: {},

  updateOpportunityById: false,
  updateOpportunityByIdError: false,

  fetchingAllRecruitmentByOppId: false,
  fetchingAllRecruitmentByOppIdError: false,
  allRecruitmentByOppId: "",

  addingDocumentByOpportunityId: false,
  addingDocumentByOpportunityIdError: false,

  fetchingDocumentsByOpportunityId: false,
  fetchingDocumentsByOpportunityIdError: false,
  documentsByOpportunityId: [],
  //search
  fetchingOpportunityInputSearchData: false,
  fetchingOpportunityInputSearchDataError: false,
  inputData: [],

  addRequirementModal:false,

  fetchingContactListByOpportunityId: false,
  fetchingContactListByOpportunityIdError: false,
  contactListByOpportunityId: [],

  fetchingClosedRequirement:false,
  fetchingClosedRequirement:false,
  closedRequiremnt:[],

  linkClosedRequirement:false,
  linkClosedRequirementError:false,

  linkingRecruitToOpportunity: false,
  linkingRecruitToOpportunityError: false,

  fetchingRecruitToOpportunity: false,
  fetchingRecruitToOpportunityError: false,
  recruitByOpportunityId: [],

  updateRemark: false,
  updateRemarkError: false,

  fetchingCandidateRequirement:false,
  fetchingCandidateRequirementError:false,
  candidateRequirement:[],



  deleteOpportunityData: false, 
  deleteOpportunityDataError: false,

  fetchingAllRecruitmentPositionFilledByOppId: false,
  fetchingAllRecruitmentPositionFilledByOppIdError: false,
  allRecruitmentPositionFilledByOppId: "",

  fetchingDeletedOpportunity: false,
  fetchingDeletedOpportunityError: false,
  deletedOpportunity: [],


  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  candidateDate:false,
  candidateDateError:false,

  deleteRequirementData: false, 
  deleteRequirementDataError: false,

  //SHARE Opportunity Permission
  addSharingOpportunity: false,
  addSharingOpportunityError: false,

  linkingProfileToOpportunity: false,
  linkingProfileToOpportunityError: false,
  profileRecruit:[],

  addingRecruitmentProfile: false,
  addingRecruitmentProfileError: false,

  fetchingAllRecruitmentDetailsByOppId: false,
  fetchingAllRecruitmentDetailsByOppIdError: false,
  allRecruitmentDetailsByOppId: [],

  addRemarksModal: false,
  addingRemark: false,
  addingRemarkError: false,

  fetchingRemark: false,
  fetchingRemarkError: false,
  remark: [],

  fetchingCurrency: false,
  fetchingCurrencyError: false,
  currencies: [],

  linkingContactsToOpportunityId: false,
  linkingContactsToOpportunityIdError: false,

  linkingCheckContactsToOpportunityId: false,
  linkingCheckContactsToOpportunityIdError: false,

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},



  linkingSkillsRecruitToOpportunity: false,
  linkingSkillsRecruitToOpportunityError: false,
  linkSkills:{},

  linkingCandidateRecruitToOpportunity: false,
  linkingCandidateRecruitToOpportunityError: false,

  linkingSatgeRecruitToOpportunity: false,
  linkingSatgeRecruitToOpportunityError: false,

  linkingStatusRecruitToOpportunity: false,
  linkingStatusRecruitToOpportunityError: false,

  deleteDocument: false,
  deleteDocumentError: false,

  fetchingSkillSetList: false,
  fetchingSkillSetListError: false,
  SkillList: [],

  fetchingRecruiterName: false,
  fetchingRecruiterNameError: true,
  recruiterName: [],

  fetchingRecruiter: false,
  fetchingRecruiterError: false,
  recruiter: [],

  
  fetchingRecruiterList: false,
  fetchingRecruiterListError: false,
  recruiterList: [],

  fetchingPublishProcessForRecruit: false,
  fetchingPublishProcessForRecruitError: false,
  recruitPublishProcess:[],
 
  fetchingSales:false,
  fetchingSalesError:false,
  sales:[],

  updatingRecruitment: false,
  updatingRecruitmentError: false,

  addingNotesByOpportunityId: false,
  addingNotesByOpportunityIdError:false,

  addSpeechModal:false,
  addRequirementModal:false,

  reInstateToggleFordeletedOpportunity: false,
  reInstateToggleFordeletedOpportunityError: false,

  showBarChartModal: false,

  fetchingRecruitToRecruiter: false,
  fetchingRecruitToRecruiterError: true,
  recruitByRecruiterId:[],
 
  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  updatingOpportunityOwenership:false,
  updatingOpportunityOwenershipError:false,

  addCandidateDateModal:false,

  fetchingAllRecruitmentAvgTimeByOppId: false,
  fetchingAllRecruitmentAvgTimeByOppIdError: false,
  allRecruitmentAvgTimeByOppId: [],

  linkOpenedRequirement:false,
  linkOpenedRequirementError:false,

};

export const OpportunityReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.CLEAR_REDUCER_STATE:
      return { ...state, opportunity:{},recruitByOpportunityId:[] };

      //set view type
      case types.SET_OPPORTUNITY_VIEW_TYPE:
        return { ...state, viewType: action.payload };

        case types.HANDLE_BAR_CHART_ORDER_MODAL:
          return { ...state, showBarChartModal: action.payload };

    /* handle Opportunity form modal */
    case types.HANDLE_OPPORTUNITY_MODAL:
      return { ...state, addOpportunityModal: action.payload };

    /* Add a opportunity */
    case types.ADD_OPPORTUNITY_REQUEST:
      return { ...state, addingOpportunity: true };
    case types.ADD_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingOpportunity: false,
        addOpportunityModal: false,
        // clearbit: null,
      };
    case types.ADD_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingOpportunity: false,
        addingOpportunityError: true,
        addOpportunityModal: false,
      };

    /* Get a opportunity  */
    case types.GET_OPPORTUNITY_REQUEST:
      return { ...state, fetchingOpportunity: true };
    case types.GET_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingOpportunity: false,
        opportunityByUserId: action.payload,
      };
    case types.GET_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingOpportunity: false,
        fetchingOpportunityError: true,
      };

    //Opportunity Details
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingOpportunityDetailsById: true };
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingOpportunityDetailsById: false,
        opportunity: action.payload,
      };
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingOpportunityDetailsById: false,
        fetchingOpportunityDetailsByIdError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    /*Opportunity Notes */
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state, fetchingNotesListByOpportunityId: true };
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByOpportunityId: false,
        notesListByOpportunityId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByOpportunityId: false,
        fetchingNotesListByOpportunityIdError: true,
      };

      case types.HANDLE_ADD_REQUIREMENT_MODAL:
        return { ...state, addRequirementModal: action.payload };

        case types.HANDLE_UPDATE_REMARK_MODAL:
          return { ...state, updateRemarkModal: action.payload };

    // Add Recruit Modal
    case types.HANDLE_RECRUIT_MODAL:
      return { ...state, addRecruitModal: action.payload };

      case types.HANDLE_CUSTOMER_MODAL:
        return { ...state, addCustomerModal: action.payload };

    // Add Profile Modal
    case types.HANDLE_TAGPROFILE_MODAL:
      return { ...state, addTagProfileModal: action.payload };

    // Update Opportunity Modal
    case types.HANDLE_UPDATE_OPPORTUNITY_MODAL:
      return { ...state, updateOpportunityModal: action.payload };

    case types.SET_OPPORTUNITY_EDIT:
      return { ...state, setEditingOpportunity: action.payload };

    case types.UPDATE_OPPORTUNITY_BY_ID_REQUEST:
      return { ...state, updateOpportunityById: true };
    case types.UPDATE_OPPORTUNITY_BY_ID_SUCCESS:
      return {
        ...state,
        updateOpportunityById: false,
        updateOpportunityModal: false,
        opportunityByUserId: state.opportunityByUserId.map((item) => {
          if (item.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_OPPORTUNITY_BY_ID_FAILURE:
      return {
        ...state,
        updateOpportunityById: false,
        updateOpportunityByIdError: true,
      };

    /* add/link opportunity document */
    case types.ADD_OPPORTUNITY_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByOpportunityId: true,
        addingDocumentByOpportunityIdError: false,
      };
    case types.ADD_OPPORTUNITY_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByOpportunityId: false,
        addingDocumentByOpportunityIdError: false,
      };
    case types.ADD_OPPORTUNITY_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByOpportunityId: false,
        addingDocumentByOpportunityIdError: true,
      };

      case types.SET_REMARK_EDIT:
      return { ...state, setEditingRemark: action.payload };

      case types.HANDLE_REMARKS_MODAL:
        return { ...state, addRemarksModal: action.payload };

    /* get list of documents of an opportunity */
    case types.GET_OPPORTUNITY_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByOpportunityId: true,
        fetchingDocumentsByOpportunityIdError: false,
      };
    case types.GET_OPPORTUNITY_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByOpportunityId: false,
        fetchingDocumentsByOpportunityIdError: false,
        documentsByOpportunityId: action.payload,
      };
    case types.GET_OPPORTUNITY_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByOpportunityId: false,
        fetchingDocumentsByOpportunityIdError: true,
      };
    //SEARCH
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_REQUEST:
      return { ...state, fetchingOpportunityInputSearchData: true };
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingOpportunityInputSearchData: false,
        opportunityByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_FAILURE:
      return { ...state, fetchingOpportunityInputSearchDataError: true };

    /**
 * get contact list by opportunityId
 */
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state, fetchingContactListByOpportunityId: true };
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactListByOpportunityId: false,
        contactListByOpportunityId: action.payload,
      };
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        fetchingContactListByOpportunityId: false,
        fetchingContactListByOpportunityIdError: true,
      };

    //add recruit
    case types.LINK_RECRUIT_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingRecruitToOpportunity: false,

        addRecruitModal: false,
      };
    case types.LINK_RECRUIT_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingRecruitToOpportunity: false,
        linkingRecruitToOpportunityError: true,
      };

    //get recruit
    case types.GET_RECRUIT_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        fetchingRecruitToOpportunity: true,
      };
    case types.GET_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingRecruitToOpportunity: false,
        recruitByOpportunityId: action.payload,
      };
    case types.GET_RECRUIT_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingRecruitToOpportunity: false,
        fetchingRecruitToOpportunityError: true,
      };

      case types.DELETE_OPPORTUNITY_DATA_REQUEST:
        return { ...state, deleteOpportunityData: true };
      case types.DELETE_OPPORTUNITY_DATA_SUCCESS:
        return {
          ...state,
          deleteOpportunityData: false,
          opportunityByUserId: state.opportunityByUserId.filter(
            (item) => item.id !== action.payload
          ),
        };
      case types.DELETE_OPPORTUNITY_DATA_FAILURE:
        return { ...state, deleteOpportunityData: false, deleteOpportunityDataError: false };

 //delete opportunity list

 case types.GET_DELETED_OPPORTUNITY_REQUEST:
  return { ...state, fetchingDeletedOpportunity: true };
case types.GET_DELETED_OPPORTUNITY_SUCCESS:
  return {
    ...state,
    fetchingDeletedOpportunity: false,
    deletedOpportunity: action.payload,
  };
case types.GET_DELETED_OPPORTUNITY_FAILURE:
  return {
    ...state,
    fetchingDeletedOpportunity: false,
    fetchingDeletedOpportunityError: true,
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


  //SHARE Opportunity Permissiom
  case types.ADD_SHARE_OPPORTUNITY_PERMISSION_REQUEST:
    return { ...state, addSharingOpportunity: true };

  case types.ADD_SHARE_OPPORTUNITY_PERMISSION_SUCCESS:
    return { ...state, addSharingOpportunity: false, shareOpportunity: action.payload };

  case types.ADD_SHARE_OPPORTUNITY_PERMISSION_FAILURE:
    return {
      ...state,
      addSharingOpportunity: false,
      addSharingOpportunityError: true,
    };


    case types.LINK_PROFILE_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingProfileToOpportunity: true,
      };

    case types.LINK_PROFILE_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingProfileToOpportunity: false,
        profileRecruit: action.payload,
      };

    case types.LINK_PROFILE_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingProfileToOpportunity: false,
        linkingProfileToOpportunityError: true,
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

        case types.ADD_REMARK_REQUEST:
          return {
            ...state,
            addingRemark: true,
          };
    
        case types.ADD_REMARK_SUCCESS:
          return {
            ...state,
            addingRemark: false,
            addRemarksModal: false,
          };
    
        case types.ADD_REMARK_FAILURE:
          return {
            ...state,
            addingRemarkError: true,
            addRemarksModal: false,
          };

          case types.HANDLE_ADD_REQUIREMENT_DETAIL_MODAL:
            return { ...state, addRequirementDetailModal: action.payload };

          case types.SET_ADD_REQUIREMENT:
            return { ...state, setAddRequirement: action.payload };

          case types.GET_REMARK_REQUEST:
            return {
              ...state,
              fetchingRemark: true,
            };
      
          case types.GET_REMARK_SUCCESS:
            return {
              ...state,
              fetchingRemark: false,
              remark: action.payload,
            };
      
          case types.GET_REMARK_FAILURE:
            return {
              ...state,
              fetchingRemarkkError: true,
            };

            case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_REQUEST:
              return {
                ...state,
                linkingSkillsRecruitToOpportunity: true,
              };
            case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_SUCCESS:
              return {
                ...state,
                linkingSkillsRecruitToOpportunity: false,
                linkSkills:action.payload,
                // recruitByOpportunityId: state.recruitByOpportunityId.map(
                //   (recruit, i) => {
                //     if (recruit.profileId === action.payload.profileId) {
                //       return action.payload;
                //     } else {
                //       return recruit;
                //     }
                //   }
                // ),
              };
            case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_FAILURE:
              return {
                ...state,
                linkingSkillsRecruitToOpportunity: false,
                linkingSkillsRecruitToOpportunityError: true,
              };
              case types.SET_CURRENT_OPPORTUNITY_RECRUITMENT_DATA:
                return { ...state, currentOpportunityRecruitmentData: action.payload };
                case types.SET_CURRENT_RECRUITER_DATA:
                  return { ...state, currentRecruiterData: action.payload };

                case types.HANDLE_SELECT_SPONSOR_MODAL:
                  return { ...state, addSponsorModal: action.payload };

                  case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_REQUEST:
                    return {
                      ...state,
                      linkingCandidateRecruitToOpportunity: true,
                    };
                  case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_SUCCESS:
                    return {
                      ...state,
                      linkingCandidateRecruitToOpportunity: false,
                      addRecruiterModal:false,
                      recruitByOpportunityId: state.recruitByOpportunityId.map(
                        (item, i) => {
                          if (item.recruitmentId === action.payload.recruitmentId) {
                            return action.payload;
                          } else {
                            return item;
                          }
                        }
                      ),
                    };
                  case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_FAILURE:
                    return {
                      ...state,
                      addRecruiterModal:false,
                      linkingCandidateRecruitToOpportunity: false,
                      linkingCandidateRecruitToOpportunityError: true,
                    };

                    case types.HANDLE_CANDIDATE_DATE_MODAL:
                      return { ...state, addCandidateDateModal: action.payload };
                

                    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_REQUEST:
                      return {
                        ...state,
                        linkingSatgeRecruitToOpportunity: true,
                      };
                    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_SUCCESS:
                      return {
                        ...state,
                        linkingSatgeRecruitToOpportunity: false,
                        addTagProfileModal: false,
                        candidateRequirement: state.candidateRequirement.map(
                          (recruit, i) => {
                            if (recruit.profileId === action.payload.profileId) {
                              return action.payload;
                            } else {
                              return recruit;
                            }
                          }
                        ),
                      };
                    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_FAILURE:
                      return {
                        ...state,
                        linkingSatgeRecruitToOpportunity: false,
                        linkingSatgeRecruitToOpportunityError: true,
                      };

                      case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_REQUEST:
                        return {
                          ...state,
                          linkingStatusRecruitToOpportunity: true,
                        };
                      case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_SUCCESS:
                        return {
                          ...state,
                          linkingStatusRecruitToOpportunity: false,
                          candidateRequirement: state.candidateRequirement.map(
                            (recruit, i) => {
                              if (recruit.profileId === action.payload.profileId) {
                                return action.payload;
                              } else {
                                return recruit;
                              }
                            }
                          ),
                        };
                      case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_FAILURE:
                        return {
                          ...state,
                          linkingStatusRecruitToOpportunity: false,
                          linkingStatusRecruitToOpportunityError: true,
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


   case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByOpportunityId: state.documentsByOpportunityId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

      case types.GET_CURRENCY_REQUEST:
        return { ...state, fetchingCurrency: true };
      case types.GET_CURRENCY_SUCCESS:
        return { ...state, fetchingCurrency: false, currencies: action.payload };
      case types.GET_CURRENCY_FAILURE:
        return {
          ...state,
          fetchingCurrency: false,
          fetchingCurrencyError: true,
        };

        case types.SKILL_SET_LIST_REQUEST:
          return { ...state, fetchingSkillSetList: true };
        case types.SKILL_SET_LIST_SUCCESS:
          return {
            ...state,
            fetchingSkillSetList: false,
            SkillList:action.payload,
          };
        case types.SKILL_SET_LIST_FAILURE:
          return { ...state, fetchingSkillSetListError: true };

          case types.HANDLE_RECRUITER_MODAL:
            return { ...state, addRecruiterModal: action.payload };

            case types.GET_RECRUITER_NAME_REQUEST:
              return { ...state, fetchingRecruiterName: true };
            case types.GET_RECRUITER_NAME_SUCCESS:
              return {
                ...state,
                fetchingRecruiterName: false,
                recruiterName: action.payload,
              };
            case types.GET_RECRUITER_NAME_FAILURE:
              return {
                ...state,
                fetchingRecruiterName: false,
                fetchingRecruiterNameError: true,
              };

            //get Recruiter
    case types.GET_RECRUITER_REQUEST:
      return { ...state, fetchingRecruiter: true };
    case types.GET_RECRUITER_SUCCESS:
      return {
        ...state,
        fetchingRecruiter: false,
        recruiter: action.payload,
      };
    case types.GET_RECRUITER_FAILURE:
      return {
        ...state,
        fetchingRecruiter: false,
        fetchingRecruiterError: true,
      };

      case types.GET_RECRUITER_LIST_REQUEST:
        return { ...state, fetchingRecruiterList: true };
      case types.GET_RECRUITER_LIST_SUCCESS:
        return {
          ...state,
          fetchingRecruiterList: false,
          recruiterList: action.payload,
        };
      case types.GET_RECRUITER_LIST_FAILURE:
        return {
          ...state,
          fetchingRecruiterList: false,
          fetchingRecruiterListError: true,
        };

        case types.GET_SALES_LIST_REQUEST:
          return { ...state, fetchingSales: true };
        case types.GET_SALES_LIST_SUCCESS:
          return {
            ...state,
            fetchingSales: false,
            sales: action.payload,
          };
        case types.GET_SALES_LIST_FAILURE:
          return {
            ...state,
            fetchingSales: false,
            fetchingSalesError: true,
          };

          case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_REQUEST:
      return { ...state, linkingCheckContactsToOpportunityId: true };
    case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        linkingCheckContactsToOpportunityId: false,
      };
    case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        linkingCheckContactsToOpportunityId: false,
        linkingCheckContactsToOpportunityIdError: true,
      };

      case types.GET_ALL_RECRUITMENT_BY_OPP_ID_REQUEST:
        return {
          ...state,
          fetchingAllRecruitmentByOppId: true,
        };
  
      case types.GET_ALL_RECRUITMENT_BY_OPP_ID_SUCCESS:
        return {
          ...state,
          fetchingAllRecruitmentByOppId: false,
          allRecruitmentByOppId: action.payload,
        };
  
      case types.GET_ALL_RECRUITMENT_BY_OPP_ID_FAILURE:
        return {
          ...state,
          fetchingAllRecruitmentByOppIdError: true,
        };


        case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_REQUEST:
          return {
            ...state,
            fetchingAllRecruitmentPositionByOppId: true,
          };
    
        case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_SUCCESS:
          return {
            ...state,
            fetchingAllRecruitmentPositionByOppId: false,
            allRecruitmentPositionByOppId: action.payload,
          };
    
        case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_FAILURE:
          return {
            ...state,
            fetchingAllRecruitmentPositionByOppIdError: true,
          };


          case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_REQUEST:
            return {
              ...state,
              fetchingAllRecruitmentPositionFilledByOppId: true,
            };
      
          case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_SUCCESS:
            return {
              ...state,
              fetchingAllRecruitmentPositionFilledByOppId: false,
              allRecruitmentPositionFilledByOppId: action.payload,
            };
      
          case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_FAILURE:
            return {
              ...state,
              fetchingAllRecruitmentPositionFilledByOppIdError: true,
            };
      
            case types.GET_ALL_OPPORTUNITIES_REQUEST:
              return { ...state, fetchingAllOpportunities: true };
            case types.GET_ALL_OPPORTUNITIES_SUCCESS:
              return {
                ...state,
                fetchingAllOpportunities: false,
                opportunityByUserId: action.payload,
              };
            case types.GET_ALL_OPPORTUNITIES_FAILURE:
              return {
                ...state,
                fetchingAllOpportunities: false,
                fetchingAllOpportunitiesError: true,
              };

              case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_REQUEST:
                return {
                  ...state,
                  fetchingAllRecruitmentDetailsByOppId: true,
                };
          
              case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_SUCCESS:
                return {
                  ...state,
                  fetchingAllRecruitmentDetailsByOppId: false,
                  allRecruitmentDetailsByOppId: action.payload,
                };
          
              case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_FAILURE:
                return {
                  ...state,
                  fetchingAllRecruitmentDetailsByOppIdError: true,
                };


                case types.GET_SKILLS_COUNT_REQUEST:
                  return { ...state, fetchingSkillsCount: true };
                case types.GET_SKILLS_COUNT_SUCCESS:
                  return {
                    ...state,
                    fetchingSkillsCount: false,
                    skillsCount: action.payload,
                  };
                case types.GET_SKILLS_COUNT_FAILURE:
                  return {
                    ...state,
                    fetchingSkillsCount: false,
                    fetchingSkillsCountError: true,
                  };

                  case types.DELETE_REQUIREMENT_DATA_REQUEST:
                    return { ...state, deleteRequirementData: true };
                  case types.DELETE_REQUIREMENT_DATA_SUCCESS:
                    return {
                      ...state,
                      deleteRequirementData: false,
                      recruitByOpportunityId: state.recruitByOpportunityId.filter(
                        (item) => item.recruitmentId !== action.payload
                      ),
                    };
                  case types.DELETE_REQUIREMENT_DATA_FAILURE:
                    return { ...state, deleteRequirementData: false, deleteRequirementDataError: false };


                    case types.UPDATE_RECRUITMENT_REQUEST:
      return {
        ...state,
        updatingRecruitment: true,
      };
    case types.UPDATE_RECRUITMENT_SUCCESS:
      return {
        ...state,
        updatingRecruitment: false,
        addRequirementModal:false,

        recruitByOpportunityId: state.recruitByOpportunityId.map((item) => {
          if (item.recruitmentId === action.payload.recruitmentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_RECRUITMENT_FAILURE:
      return {
        ...state,
        updatingRecruitment: false,
        updatingRecruitmentError: true,
      };
          
      case types.HANDLE_REACT_SPEECH_MODAL:
        return { ...state, addSpeechModal: action.payload };

      case types.ADD_OPPORTUNITY_NOTES_REQUEST:
        return {
          ...state,
          addingNotesByOpportunityId: true,          
        };
      case types.ADD_OPPORTUNITY_NOTES_SUCCESS:
        return {
          ...state,
          addingNotesByOpportunityId: false,
          addingNotesByOpportunityIdError: false,
          addSpeechModal:false,
        };
      case types.ADD_OPPORTUNITY_NOTES_FAILURE:
        return {
          ...state,
          addingNotesByOpportunityId: false,
          addingNotesByOpportunityIdError: true,
        };  


        case types.ADD_WEBSITE_REQUEST:
          return { ...state, addingWebsite: true };
        case types.ADD_WEBSITE_SUCCESS:
          return { ...state, addingWebsite: false,  };
        case types.ADD_WEBSITE_FAILURE:
          return { ...state, addingWebsite: false,  };
        
 //reinstate

 case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_REQUEST:
  return { ...state, reInstateToggleFordeletedOpportunity: true };
case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_SUCCESS:
  return {
    ...state,
    reInstateToggleFordeletedOpportunity: false,
    deletedOpportunity: state.deletedOpportunity.filter(
      (item) => item.opportunityId !== action.payload.leadsId
    ),
  };
case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_FAILURE:
  return {
    ...state,
    reInstateToggleFordeletedOpportunity: false,
    reInstateToggleFordeletedOpportunityError: true,
  };

   //email sendfor stage

   case types.SEND_EMAIL_STAGE_UPDATE_REQUEST:
    return { ...state, emailingStage: true };
  case types.SEND_EMAIL_STAGE_UPDATE_SUCCESS:
    return {
      ...state,
      emailingStage: false,
    };
  case types.SEND_EMAIL_STAGE_UPDATE_FAILURE:
    return { ...state, emailingStage: false, emailingStageError: true };

    // case types.PUBLISH_SUMMARY_REQUEST:
    //   return { ...state, publishSummary: true };
    // case types.PUBLISH_SUMMARY_SUCCESS:
    //   return {
    //     ...state,
    //     publishSummary: false,
    //     allRecruitmentDetailsByOppId: action.payload,
    //     // addTeamTransferModal: false,
    //   };
    // case types.PUBLISH_SUMMARY_FAILURE:
    //   return {
    //     ...state,
    //     publishSummary: false,
    //     publishSummaryError: true,
    //   };


      // case types.UNPUBLISH_SUMMARY_REQUEST:
      //   return { ...state, unpublishSummary: true };
      // case types.UNPUBLISH_SUMMARY_SUCCESS:
      //   return {
      //     ...state,
      //     unpublishSummary: false,
         
      //     // addTeamTransferModal: false,
      //   };
      // case types.UNPUBLISH_SUMMARY_FAILURE:
      //   return {
      //     ...state,
      //     unpublishSummary: false,
      //     unpublishSummaryError: true,
      //   };
   
      case types.GET_RECRUIT_TO_REQUIREMENT_REQUEST:
        return {
          ...state,
          fetchingRecruitToRecruiter: true,
        };
      case types.GET_RECRUIT_TO_REQUIREMENT_SUCCESS:
        return {
          ...state,
          fetchingRecruitToRecruiter: false,
          recruitByRecruiterId: action.payload,
        };
      case types.GET_RECRUIT_TO_REQUIREMENT_FAILURE:
        return {
          ...state,
          fetchingRecruitToRecruiter: false,
          fetchingRecruitToRecruiterError: true,
        };

        case types.GET_RECRUITER_REQUIREMENT_REQUEST:
          return { ...state, fetchingRecruiterRequirement: true };
        case types.GET_RECRUITER_REQUIREMENT_SUCCESS:
          return {
            ...state,
            fetchingRecruiterRequirement: false,
             recruiterRequirement: action.payload,
          };
        case types.GET_RECRUITER_REQUIREMENT_FAILURE:
          return {
            ...state,
            fetchingRecruiterRequirement: false,
            fetchingRecruiterRequirementError: true,
          };

          case types.GET_OPPORTUNITY_RECORD_REQUEST:
            return { ...state, fetchingOpportunityRecord: true };
          case types.GET_OPPORTUNITY_RECORD_SUCCESS:
            return { ...state, fetchingOpportunityRecord: false, opportunityRecord: action.payload };
          case types.GET_OPPORTUNITY_RECORD_FAILURE:
            return {
              ...state,
              fetchingOpportunityRecord: false,
              fetchingOpportunityRecordError: true,
            };


            case types.GET_CANDIDATE_REQUIREMENT_REQUEST:
      return { ...state, fetchingCandidateRequirement: true };
    case types. GET_CANDIDATE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingCandidateRequirement: false,
        candidateRequirement: action.payload,
      };
    case types.GET_CANDIDATE_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingCandidateRequirement: false,
        fetchingCandidateRequirementError: true,
      };

      case types.ADD_CANDIDATE_DATE_REQUEST:
        return {
          ...state,
          candidateDate: true,
        };
      case types.ADD_CANDIDATE_DATE_SUCCESS:
        return {
          ...state,
          candidateDate: false,
          addCandidateDateModal:false,
          candidateRequirement: state.candidateRequirement.map(
            (recruit, i) => {
              if (recruit.profileId === action.payload.profileId) {
                return action.payload;
              } else {
                return recruit;
              }
            }
          ),
          // todayCustomer: action.payload,
        };
      case types.ADD_CANDIDATE_DATE_FAILURE:
        return {
          ...state,
          candidateDate: false,
          candidateDateError: true,
        };

        case types.UPDATE_REMARK_REQUEST:
          return { ...state, updateRemark: true };
        case types.UPDATE_REMARK_SUCCESS:
          return {
            ...state,
            updateRemark: false,
            updateRemarkModal: false,
            remark: state.remark.map((item) => {
              if (item.recruitmentStageNoteId === action.payload.recruitmentStageNoteId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
          case types.UPDATE_REMARK_FAILURE:
            return {
              ...state,
              updateRemark: false,
              updateRemarkError: true,
            };

            case types.UPDATE_OPPORTUNITY_OWNERSHIP_REQUEST:
              return { ...state, updatingOpportunityOwenership: true };
            case types.UPDATE_OPPORTUNITY_OWNERSHIP_SUCCESS:
              return {
                ...state,
                updatingOpportunityOwenership: false,
                // updateCandidateEmploymentModal: false,
                employmentDetails: state.employmentDetails.map((employment, i) => {
                  if (employment.id === action.payload.id) {
                    return action.payload;
                  } else {
                    return employment;
                  }
                }),
              };
            case types.UPDATE_OPPORTUNITY_OWNERSHIP_SUCCESS:
              return {
                ...state,
                updatingOpportunityOwenership: false,
                updatingOpportunityOwenershipError: true,
              };

              case types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_REQUEST:
                return { ...state, fetchingAllRecruitmentAvgTimeByOppId: true };
              case types. GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_SUCCESS:
                return {
                  ...state,
                  fetchingAllRecruitmentAvgTimeByOppId: false,
                  allRecruitmentAvgTimeByOppId: action.payload,
                };
              case types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_FAILURE:
                return {
                  ...state,
                  fetchingAllRecruitmentAvgTimeByOppId: false,
                  fetchingAllRecruitmentAvgTimeByOppIdError: true,
                };
               
            

                  case types.LINK_CLOSE_REQUIREMENT_REQUEST:
                    return {
                      ...state,
                      linkClosedRequirement: true,
                    };
                  case types.LINK_CLOSE_REQUIREMENT_SUCCESS:
                    return {
                      ...state,
                      linkClosedRequirement: false,
                      // addDonotCallModal:false,
                      // candidateRequirement: state.candidateRequirement.map(
                      //   (recruit, i) => {
                      //     if (recruit.profileId === action.payload.profileId) {
                      //       return action.payload;
                      //     } else {
                      //       return recruit;
                      //     }
                      //   }
                      // ),
                      // todayCustomer: action.payload,
                    };
                  case types.LINK_CLOSE_REQUIREMENT_FAILURE:
                    return {
                      ...state,
                      linkClosedRequirement: false,
                      linkClosedRequirementError: true,
                    };


                    case types.GET_CLOSED_REQUIREMENT_REQUEST:
                      return {
                        ...state,
                        fetchingClosedRequirement: true,
                      };
                    case types.GET_CLOSED_REQUIREMENT_SUCCESS:
                      return {
                        ...state,
                        fetchingClosedRequirement: false,
                        closedRequiremnt: action.payload,
                      };
                    case types.GET_CLOSED_REQUIREMENT_FAILURE:
                      return {
                        ...state,
                        fetchingClosedRequirement: false,
                        fetchingClosedRequirementError: true,
                      };

                      case types.HANDLE_SENTIMENT_MODAL:
        return { ...state, addSentimentModal: action.payload };


        case types.ADD_SENTIMENT_REQUEST:
          return {
            ...state,
            addingSentiment: true,
          };
    
        case types.ADD_SENTIMENT_SUCCESS:
          return {
            ...state,
            addingSentiment: false,
            sentiment:action.payload,
            addSentimentModal: false,
            addRemarksModal:true,
          };
    
        case types.ADD_SENTIMENT_FAILURE:
          return {
            ...state,
            addingSentimentError: true,
            // addSentimentModal: false,
          };

          case types.LINK_OPENED_REQUIREMENT_REQUEST:
            return {
              ...state,
              linkOpenedRequirement: true,
            };
          case types.LINK_OPENED_REQUIREMENT_SUCCESS:
            return {
              ...state,
              linkOpenedRequirement: false,
              // addDonotCallModal:false,
              // candidateRequirement: state.candidateRequirement.map(
              //   (recruit, i) => {
              //     if (recruit.profileId === action.payload.profileId) {
              //       return action.payload;
              //     } else {
              //       return recruit;
              //     }
              //   }
              // ),
              // todayCustomer: action.payload,
            };
          case types.LINK_OPENED_REQUIREMENT_FAILURE:
            return {
              ...state,
              linkOpenedRequirement: false,
              linkOpenedRequirementError: true,
            };
                
            case types.GET_PUBLISH_PROCESS_FOR_RECRUIT_REQUEST:
              return {
                ...state,
                fetchingPublishProcessForRecruit: true,
                fetchingPublishProcessForRecruitError: false,
              };
            case types.GET_PUBLISH_PROCESS_FOR_RECRUIT_SUCCESS:
              return {
                ...state,
                fetchingPublishProcessForRecruit: false,
                fetchingPublishProcessForRecruitError: false,
                recruitPublishProcess: action.payload,
              };
            case types.GET_PUBLISH_PROCESS_FOR_RECRUIT_FAILURE:
              return {
                ...state,
                fetchingPublishProcessForRecruit: false,
                fetchingPublishProcessForRecruitError: true,
              };



          default:
      return state;
  }
};
