import * as types from "./PermissionsActionTypes";
const initialState = {
  
  fetchingPermissions: false,
  fetchingPermissionsError: false,
  permissionsData: {},
//   feedBackModal: false,
  feedbackData: {},
  updatingPermissions: false,
  updatingPermissionsError: false,

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],
};
export const PermissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PERMISSIONS_REQUEST:
        return { ...state, fetchingPermissions: true };
      case types.GET_PERMISSIONS_SUCCESS:
        return {
          ...state,
          fetchingPermissions: false,
          permissionsData: action.payload,
        };
      case types.GET_PERMISSIONS_FAILURE:
        return {
          ...state,
          fetchingPermissions: false,
          fetchingPermissionsError: false,
        };

        case types.ADDING_PERMISSIONS_REQUEST:
          return { ...state, updatingPermissions: true };
        case types.ADDING_PERMISSIONS_SUCCESS:
          return {
            ...state,
            updatingPermissions: false,
            // userList: state.userList.map((item) => {
            //   if (item.userId === action.payload.userId)
            //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
            //   else {
            //     return item;
            //   }
            // }),
          
          };
        case types.ADDING_PERMISSIONS_FAILURE:
          return {
            ...state,
            updatingPermissions: false,
            updatingPermissionsError: true,
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
    
    default:
      return state;
  }
};
