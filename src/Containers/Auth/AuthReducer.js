import * as types from "./AuthTypes";
const initialState = {
  env: "server",
  registering: false,
  registeringError: false,
  registeringSuccess: false,
  user: {},
  fetchingUserDetails: false,
  fetchingUserDetailsError: null,
  updatingUserDetails: false,
  updatingUserDetailsError: null,
  userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || {},
  fetchingOrganizationDetails: false,
  fetchingOrganizationDetailsError: null,
  organizationDetails: {},
  updatingOrganizationDetails: false,
  updatingOrganizationDetailsError: null,

  changingPassword: false,
  changingPasswordError: false,
  logging: false,
  loginError: false,
  token: sessionStorage.getItem("token"),

  updatingUserById: false,
  updatingUserByIdError: false,
  userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || {},

  fetchingtimeZone: false,
  fetchingTimeZoneError: false,
  timeZone: [],

  fetchingCurrency: false,
  fetchingCurrencyError: false,
  currencies: [],

  fetchingCountries: false,
  fetchingCountriesError: false,
  countries: [],

  fetchingTopicsByUserId: false,
  fetchingTopicsByUserIdError: false,
  addingTopicsByUserId: false,
  addingTopicsByUserIdError: false,
  deletingTopicsByUserId: false,
  deletingTopicsByUserIdError: false,
  topicsByUserId: [],

  fetchingCallsListByUserId: false,
  fetchingCallsListByUserIdError: false,
  callsListByUserId: [],

  fetchingEventsListByUserId: false,
  fetchingEventsListByUserIdError: false,
  eventsListByUserId: [],

  fetchingLeavesByUserId: false,
  fetchingLeavesByUserIdError: false,
  leavesListByUserId: [],

  fetchingTasksListByUserId: false,
  fetchingTasksListByUserIdError: false,
  tasksListByUserId: [],

  addingOrgSignature: false,
  addingOrgSignatureError: false,

  fetchingOrgSignature: false,
  fetchingOrgSignatureError: false,
  orgSignatureData: [],
  addingPersonalSignature: false,
  addingPersonalSignatureError: false,

  fetchingPersonalSignature: false,
  fetchingPersonalSignatureError: false,
  personalSignatureData: [],

  generatingOtpByEmail: false,
  generatingOtpByEmailError: false,
  otpMsg: {},

  validatingOtpByEmail: false,
  validatingOtpByEmailError: false,
  validateMsg: {},
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SERVER:
      return { ...state, env: action.payload };
    case types.REGISTER_REQUEST:
      return { ...state, registering: true, registeringError: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registeringError: false,
        registeringSuccess: true,
        user: action.payload,
      };
    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          address: state.userDetails.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        registeringError: true,
        registeringSuccess: false,
      };

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

    case types.GET_TIMEZONE_REQUEST:
      return { ...state, fetchingtimeZone: true };
    case types.GET_TIMEZONE_SUCCESS:
      return { ...state, fetchingtimeZone: false, timeZone: action.payload };
    case types.GET_TIMEZONE_FAILURE:
      return {
        ...state,
        fetchingtimeZone: false,
        fetchingtimeZoneError: true,
      };

    case types.GET_COUNTRIES_REQUEST:
      return { ...state, fetchingCountries: true };
    case types.GET_COUNTRIES_SUCCESS:
      return { ...state, fetchingCountries: false, countries: action.payload };
    case types.GET_COUNTRIES_FAILURE:
      return {
        ...state,
        fetchingCountries: false,
        fetchingCountriesError: true,
      };

    case types.VALIDATE_EMAIL_REQUEST:
      return { ...state };
    case types.VALIDATE_EMAIL_SUCCESS:
      return { ...state };
    case types.VALIDATE_EMAIL_FAILURE:
      return { ...state };

    case types.SET_PASSWORD_REQUEST:
      return { ...state };
    case types.SET_PASSWORD_SUCCESS:
      return { ...state };
    case types.SET_PASSWORD_FAILURE:
      return { ...state };

    case types.CHANGE_PASSWORD_REQUEST:
      return { ...state, changingPassword: true, changingPasswordError: false };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        changingPasswordError: false,
      };
    case types.CHANGE_PASSWORD_FAILURE:
      return { ...state, changingPassword: false, changingPasswordError: true };

    case types.LOGIN_REQUEST:
      return { ...state, logging: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        logging: false,
        token: action.payload.token || sessionStorage.getItem("token"),
      };
    case types.LOGIN_FAILURE:
      return { ...state, logging: false, loginError: true };

    case types.GET_USER_DETAILS_REQUEST:
      return { ...state, fetchingUserDetails: true };
    case types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingUserDetails: false,
        userDetails:
          action.payload || JSON.parse(sessionStorage.getItem("userDetails")),
      };
    case types.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingUserDetails: false,
        fetchingUserDetailsError: true,
      };

    case types.UPDATE_USER_DETAILS_REQUEST:
      return { ...state, updatingUserDetails: true };
    case types.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updatingUserDetails: false,
        userDetails:
          action.payload || JSON.parse(sessionStorage.getItem("userDetails")),
      };
    case types.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        updatingUserDetails: false,
        updatingUserDetailsError: true,
      };

    case types.GET_ORGANIZATION_DETAILS_REQUEST:
      return { ...state, fetchingOrganizationDetails: true };
    case types.GET_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingOrganizationDetails: false,
        organizationDetails: action.payload,
      };
    case types.GET_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOrganizationDetails: false,
        fetchingOrganizationDetailsError: true,
      };

    case types.UPDATE_ORGANIZATION_DETAILS_REQUEST:
      return { ...state, updatingOrganizationDetails: true };
    case types.UPDATE_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        updatingOrganizationDetails: false,
        organizationDetails: action.payload,
        userDetails: {
          ...state.userDetails,
          metaData: {
            ...state.userDetails.metaData,
            organization: action.payload,
          },
        },
      };
    case types.UPDATE_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        updatingOrganizationDetails: false,
        updatingOrganizationDetailsError: true,
      };

    /**
     * update subscriptiontype inn userDetails to
     */
    case types.UPDATE_SUBSCRIPTION_TYPE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          metaData: {
            ...state.userDetails.metaData,
            organization: {
              ...state.userDetails.metaData.organization,
              subscriptionType: action.payload,
            },
          },
        },
      };
    /**
     * this is for realtime updation of smartboost of loggedin user
     * is smartboost is updated from user drawer then, the user smartboost also get updated
     */
    case types.UPDATE_SMARTBOOST_SUCCESS:
      console.log(action.payload);
      function updateSmartBoost(userDetails, param) {
        if (userDetails.userId === param.userId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, smartBoost: param.boostInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateSmartBoost(state.userDetails, action.payload),
      };
    /**
     * this is for realtime updation of product of loggedin user
     * is product is updated from user drawer then, the user product also get updated
     */
    case types.UPDATE_PROFESSIONALDUCT_SUCCESS:
      console.log(action.payload);
      function updateProduct(userDetails, param) {
        if (userDetails.userId === param.userId) {
          return {
            ...userDetails,
            metaData: {
              ...userDetails.metaData,
              productStatus: param.productStatus,
            },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateProduct(state.userDetails, action.payload),
      };
    /**
     * this is for realtime updation of viewport of loggedin user
     * is viewport is updated from user drawer then, the user viewport status also get updated
     */
    case types.UPDATE_VIEWPORT_SUCCESS:
      console.log(action.payload);
      function updateViewport(userDetails, status) {
        return {
          ...userDetails,
          metaData: { ...userDetails.metaData, viewportStatus: status },
        };
      }
      return {
        ...state,
        userDetails: updateViewport(state.userDetails, action.payload),
      };

    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          address: state.userDetails.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };

    case types.UPDATE_LEGAL_SUCCESS:
      console.log(action.payload);
      function updateLegal(userDetails, param) {
        ////debugger;
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, legalInd: param.legalInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateLegal(state.userDetails, action.payload),
      };

    case types.UPDATE_FINANCE_SUCCESS:
      console.log(action.payload);
      function updateFinance(userDetails, param) {
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, financeInd: param.financeInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateFinance(state.userDetails, action.payload),
      };
    case types.UPDATE_RISKMANAGEMENT_SUCCESS:
      console.log(action.payload);
      function updateRisk(userDetails, param) {
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: {
              ...userDetails.metaData,
              riskManagementInd: param.riskManagementInd,
            },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateRisk(state.userDetails, action.payload),
      };

    case types.UPDATE_USER_BY_ID_REQUEST:
      return { ...state, updatingUserById: true };
    case types.UPDATE_USER_BY_ID_SUCCESS:
      return {
        ...state, updatingUserById: false,
        userDetails: action.payload
      };
    case types.UPDATE_USER_BY_ID_FAILURE:
      return { ...state, updatingUserById: false, updatingUserByIdError: true };

    /**
     * topic of intrest of an user
     */
    case types.GET_TOPICS_BY_USER_ID_REQUEST:
      return { ...state, fetchingTopicsByUserId: true };
    case types.GET_TOPICS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingTopicsByUserId: false,
        topicsByUserId: action.payload,
      };
    case types.GET_TOPICS_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingTopicsByUserId: false,
        fetchingTopicsByUserIdError: true,
      };

    case types.ADD_TOPIC_BY_USER_ID_REQUEST:
      return { ...state, addingTopicByUserId: true };
    case types.ADD_TOPIC_BY_USER_ID_SUCCESS:
      return {
        ...state,
        addingTopicByUserId: false,
        topicsByUserId: [...state.topicsByUserId, action.payload],
      };
    case types.ADD_TOPIC_BY_USER_ID_FAILURE:
      return {
        ...state,
        addingTopicByUserId: false,
        addingTopicByUserIdError: true,
      };

    case types.DELETE_TOPIC_BY_USER_ID_REQUEST:
      return { ...state, deletingTopicByUserId: true };
    case types.DELETE_TOPIC_BY_USER_ID_SUCCESS:
      return { ...state, deletingTopicByUserId: false };
    case types.DELETE_TOPIC_BY_USER_ID_FAILURE:
      return {
        ...state,
        deletingTopicByUserId: false,
        deletingTopicByUserIdError: true,
      };

    /**
     * get calls list by userId
     */
    case types.GET_CALLS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingCallsListByUserId: true };
    case types.GET_CALLS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingCallsListByUserId: false,
        callsListByUserId: action.payload,
      };
    case types.GET_CALLS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingCallsListByUserId: false,
        fetchingCallsListByUserIdError: true,
      };

    /**
     * get events list by userId
     */
    case types.GET_EVENTS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingEventsListByUserId: true };
    case types.GET_EVENTS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingEventsListByUserId: false,
        eventsListByUserId: action.payload,
      };
    case types.GET_EVENTS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingEventsListByUserId: false,
        fetchingEventsListByUserIdError: true,
      };

    //GET LEAVES DETAILS
    case types.GET_LEAVES_BY_USER_ID_REQUEST:
      return { ...state, fetchingLeavesByUserId: true };
    case types.GET_LEAVES_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingLeavesByUserId: false,
        leavesListByUserId: action.payload,
      };
    case types.GET_LEAVES_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingLeavesByUserId: false,
        fetchingLeavesByUserIdError: true,
      };
    /**
     * get tasks list by userId
     */
    case types.GET_TASKS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingTasksListByUserId: true };
    case types.GET_TASKS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingTasksListByUserId: false,
        tasksListByUserId: action.payload,
      };
    case types.GET_TASKS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingTasksListByUserId: false,
        fetchingTasksListByUserIdError: true,
      };
    //signature organization
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST:
      return {
        ...state,
        addingOrgSignature: true,
      };
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        addingOrgSignature: false,

        orgSignatureData: action.payload,
      };
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        addingOrgSignature: false,
        addingOrgSignatureError: true,
      };

    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST:
      return {
        ...state,
        fetchingOrgSignature: true,
        fetchingOrgSignatureError: false,
      };
    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        fetchingOrgSignature: false,
        fetchingOrgSignatureError: false,
        orgSignatureData: action.payload,
      };
    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        fetchingOrgSignature: false,
        fetchingOrgSignatureError: true,
      };
    //signature

    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST:
      return {
        ...state,
        addingPersonalSignature: true,
      };
    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        addingPersonalSignature: false,

        personalSignatureData: action.payload,
      };
    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE:
      return {
        ...state,
        addingPersonalSignature: false,
        addingPersonalSignatureError: true,
      };

    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST:
      return {
        ...state,
        fetchingPersonalSignature: true,
        fetchingPersonalSignatureError: false,
      };
    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingPersonalSignature: false,
        fetchingPersonalSignatureError: false,
        personalSignatureData: action.payload,
      };
    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingPersonalSignature: false,
        fetchingPersonalSignatureError: true,
      };

    case types.UPDATE_RECRUITMENT_ADVANCE_SUCCESS:
      console.log(action.payload);
      function recruitAdvance(userDetails, status) {
        return {
          ...userDetails,
          metaData: { ...userDetails.metaData, advanceRecruitInd: status },
        };
      }
      return {
        ...state,
        userDetails: recruitAdvance(state.userDetails, action.payload),
      };

    case types.GENERATE_OTP_BY_EMAIL_REQUEST:
      return { ...state, generatingOtpByEmail: true };
    case types.GENERATE_OTP_BY_EMAIL_SUCCESS:
      return {
        ...state,
        generatingOtpByEmail: false,
        otpMsg: action.payload
      };
    case types.GENERATE_OTP_BY_EMAIL_FAILURE:
      return {
        ...state,
        generatingOtpByEmail: false,
        generatingOtpByEmailError: true
      };

    case types.VALIDATE_OTP_BY_EMAIL_REQUEST:
      return { ...state, validatingOtpByEmail: true };
    case types.VALIDATE_OTP_BY_EMAIL_SUCCESS:
      return {
        ...state,
        validatingOtpByEmail: false,
        validateMsg: action.payload
      };
    case types.VALIDATE_OTP_BY_EMAIL_FAILURE:
      return {
        ...state,
        validatingOtpByEmail: false,
        validatingOtpByEmailError: true
      };

    default:
      return state;
  }
  return state;
};
