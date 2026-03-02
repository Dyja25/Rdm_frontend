import * as types from './PlannerActionTypes'

const initialState = {
    viewType: "table",

    plannerStartDate: '',
    plannerEndDate: '',
    plannerStartTime: '',
    plannerEndTime: '',
    chooserModal: false,
    viewEditModal: false,
    selectedEvent: {},
    openedFormModal: 'event',

    fetchingPermissionsList: false,
    fetchingPermissionsListError: false,
    permissionsDataList: [],

    addingSharingPlanner: false,
  addingSharingPlannerError: false,
}
export const plannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PLANNER_VIEW_TYPE:
            return { ...state, viewType: action.payload };

        case types.SET_PLANNER_DATE:
            const { startDate, endDate, startTime, endTime } = action.payload;
            return { ...state, plannerStartDate: startDate, plannerEndDate: endDate, plannerStartTime: startTime, plannerEndTime: endTime };
        case types.HANDLE_EVENT_MODAL:
            return { ...state, addEventModal: action.payload };
        case types.HANDLE_VIEW_EDIT_MODAL:
            return { ...state, viewEditModal: action.payload.visible, selectedEvent: action.payload.event };
        case types.SET_DATE_AND_TIME:
            return { ...state };
        case types.SET_FORM_MODAL_TYPE:
            return { ...state, chooserModal: false };
        case types.HANDLE_CHOOSER_MODAL:
            return { ...state, chooserModal: action.payload };

    

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

    case types.SHARE_PLANNER_PERMISSION_REQUEST:
        return { ...state, addingSharingPlanner: true };
    
      case types.SHARE_PLANNER_PERMISSION_SUCCESS:
        return { ...state, addingSharingPlanner: false, sharingPlanner: action.payload };
    
      case types.SHARE_PLANNER_PERMISSION_FAILURE:
        return {
          ...state,
          addingSharingPlanner: false,
          addingSharingPlannerError: true,
        };
    
    default:
    return state;
}
};