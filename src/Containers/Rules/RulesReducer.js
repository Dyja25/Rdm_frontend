import * as types from "./RulesActionType";

const initialState = {
  addTemplateModal: false,

  addingSla: false,
  addingSlaError: false,

  fetchingSla: false,
  fetchingSlaError: false,
  sla: [],

  fetchingMatrix: false,
  fetchingMatrixError: false,
  matrix: {},

  addingMatrix: false,
  addingMatrixError: false,

  addingTemplate: false,
  addingTemplateError: false,

  fetchingTemplate: false,
  fetchingTemplateError: false,
  template: [],
  currentEmail: {},
  currentNotification: {},

  addingNotificationTemplate: false,
  addingNotificationTemplateError: false,

  fetchingNotificationTemplate: false,
  fetchingNotificationTemplateError: false,
  notificationTemplate: [],

  addingQuoteSearchTab: false,
  addingQuoteSearchTabError: false,

  fetchingQuoteSearchTab: false,
  fetchingQuoteSearchTabError: false,
  searchTabData: {},

  addingRecruitPro: false,
  addingRecruitProError: false,

  fetchingRecruitPro: false,
  fetchingRecruitProError: false,
  recruitProForEmail: [],

  templateViewModal:false,


};
export const ruleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_TEMPLATE_MODAL:
      return { ...state, addTemplateModal: action.payload };

      case types.HANDLE_TEMPLATE_NOTIFICATION_MODAL:
        return { ...state, addTemplateNotificatonModal: action.payload };

    case types.ADD_SLA_REQUEST:
      return { ...state, addingSla: true };
    case types.ADD_SLA_SUCCESS:
      return {
        ...state,
        addingSla: false,
      };
    case types.HANDLE_LEAVES_MODAL:
      return { ...state, addLeavesModal: action.payload };

    case types.ADD_SLA_FAILURE:
      return {
        ...state,
        addingSla: false,
        addingSlaError: true,
      };

    case types.ADD_MATRIX_REQUEST:
      return { ...state, addingMatrix: true };
    case types.ADD_MATRIX_SUCCESS:
      return {
        ...state,
        addingMatrix: false,
      };
    case types.ADD_MATRIX_FAILURE:
      return {
        ...state,
        addingMatrix: false,
        addingMatrixError: true,
      };

    case types.GET_SLA_REQUEST:
      return { ...state, fetchingSla: true };
    case types.GET_SLA_SUCCESS:
      return {
        ...state,
        fetchingSla: false,
        sla: action.payload,
      };
    case types.GET_SLA_FAILURE:
      return {
        ...state,
        fetchingSla: false,
        fetchingSlaError: true,
      };

    case types.GET_MATRIX_REQUEST:
      return { ...state, fetchingMatrix: true };
    case types.GET_MATRIX_SUCCESS:
      return {
        ...state,
        fetchingMatrix: false,
        matrix: action.payload,
      };
    case types.GET_MATRIX_FAILURE:
      return {
        ...state,
        fetchingMatrix: false,
        fetchingMatrixError: true,
      };

    case types.ADD_TEMPLATE_REQUEST:
      return { ...state, addingTemplate: true };
    case types.ADD_TEMPLATE_SUCCESS:
      return {
        ...state,
        addingTemplate: false,
        addTemplateModal: false,
      };
    case types.ADD_TEMPLATE_FAILURE:
      return {
        ...state,
        addingTemplate: false,
        addingTemplateaError: true,
        addTemplateModal: false,
      };

    case types.GET_TEMPLATE_REQUEST:
      return { ...state, fetchingTemplate: true };
    case types.GET_TEMPLATE_SUCCESS:
      return {
        ...state,
        fetchingTemplate: false,
        template: action.payload,
      };
    case types.GET_TEMPLATE_FAILURE:
      return {
        ...state,
        fetchingTemplate: false,
        fetchingTemplateError: true,
      };

    case types.ADD_NOTIFICATION_TEMPLATE_REQUEST:
      return { ...state, addingNotificationTemplate: true };
    case types.ADD_NOTIFICATION_TEMPLATE_SUCCESS:
      return {
        ...state,
        addingNotificationTemplate: false,
        addTemplateModal: false,
      };
    case types.ADD_NOTIFICATION_TEMPLATE_FAILURE:
      return {
        ...state,
        addingNotificationTemplate: false,
        addingNotificationTemplateError: true,
        addTemplateModal: false,
      };

    case types.GET_NOTIFICATION_TEMPLATE_REQUEST:
      return { ...state, fetchingNotificationTemplate: true };
    case types.GET_NOTIFICATION_TEMPLATE_SUCCESS:
      return {
        ...state,
        fetchingNotificationTemplate: false,
        notificationTemplate: action.payload,
      };
    case types.GET_NOTIFICATION_TEMPLATE_FAILURE:
      return {
        ...state,
        fetchingNotificationTemplate: false,
        fetchingNotificationTemplateError: true,
      };

    case types.UPDATE_TEMPLATE_REQUEST:
      return { ...state };
    case types.UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        // template: state.template.map((item) =>
        //   item.templateId === action.payload.templateId
        //     ? [...state.template, action.payload]
        //     : item
        // ),
      };
    case types.UPDATE_TEMPLATE_FAILURE:
      return { ...state,udatingNotification: true };

    case types.UPDATE_NOTIFICATION_TEMPLATE_REQUEST:
      return { ...state,udatingNotification: true };
    case types.UPDATE_NOTIFICATION_TEMPLATE_SUCCESS:
      return {
        ...state,
        udatingNotification: false,
        // notificationTemplate: state.notificationTemplate.map(
        //   (item) =>
        //     item.notificationTemplateId ===
        //     action.payload.notificationTemplateId
        //     ? [...state.notificationTemplate, action.payload]
        //     : item
        // ),
      };
    case types.UPDATE_NOTIFICATION_TEMPLATE_FAILURE:
      return { 
        ...state,
      udatingNotification: false,
      udatingNotificationError: true,
  };

    case types.SET_CURRENT_EMAIL:
      return { ...state, currentEmail: action.payload };

    //SearchTab
    case types.ADD_SEARCH_TAB_REQUEST:
      return { ...state, addingQuoteSearchTab: true };
    case types.ADD_SEARCH_TAB_SUCCESS:
      return {
        ...state,
        addingQuoteSearchTab: false,
        searchTabData: action.payload,
      };
    case types.ADD_SEARCH_TAB_FAILURE:
      return {
        ...state,
        addingQuoteSearchTab: false,
        addingQuoteSearchTabError: true,
      };

      case types.GET_SEARCH_TAB_REQUEST:
      return { ...state, fetchingQuoteSearchTab: true };
    case types.GET_SEARCH_TAB_SUCCESS:
      return {
        ...state,
        fetchingQuoteSearchTab: false,
        searchTabData: action.payload,
      };
    case types.GET_SEARCH_TAB_FAILURE:
      return {
        ...state,
        fetchingQuoteSearchTab: false,
        fetchingQuoteSearchTabError: true,
      };

      //RecruitPro For Mail Add Get
      case types.ADD_RECRUITPRO_FOR_EMAIL_REQUEST:
        return { ...state, addingRecruitPro: true };
      case types.ADD_RECRUITPRO_FOR_EMAIL_SUCCESS:
        return {
          ...state,
          addingRecruitPro: false,
          recruitProForEmail: action.payload,
        };
      case types.ADD_RECRUITPRO_FOR_EMAIL_FAILURE:
        return {
          ...state,
          addingRecruitPro: false,
          addingRecruitProError: true,
        };

        case types.GET_RECRUITPRO_FOR_EMAIL_REQUEST:
          return { ...state, fetchingRecruitPro: true };
        case types.GET_RECRUITPRO_FOR_EMAIL_SUCCESS:
          return {
            ...state,
            fetchingRecruitPro: false,
            recruitProForEmail: action.payload,
          };
        case types.GET_RECRUITPRO_FOR_EMAIL_FAILURE:
          return {
            ...state,
            fetchingRecruitPro: false,
            fetchingRecruitProError: true,
          };

          case types.SET_CURRENT_NOTIFICATION:
      return { ...state, currentNotification: action.payload };

      case types.HANDLE_TEMPLATE_VIEW_MODAL:
        return { ...state, templateViewModal: action.payload };


    default:
      return state;
  }
};
