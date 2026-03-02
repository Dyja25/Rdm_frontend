import * as types from "./LeavesActionType";

const initialState = {
    addLeaveModal: false,
    addingLeaves: false,
    addingLeavesError: false,

    fetchingLeaveListRangeByUserId: false,
    fetchingLeaveListRangeByUserIdError: false,
    leaveListRangeByUserId: [],

    fetchingLeaveLeftSideData: false,
    fetchingLeaveLeftSideDataError: false,
    leaveFetching: [],

    setEditingLeave:{},
    updateLeaveModal:false,
  
    updatingLeave: false,
    updatingLeaveError: false,
};

export const LeavesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_LEAVES_MODAL:
            return { ...state, addLeaveModal: action.payload };

        case types.ADD_LEAVES_REQUEST:
            return {
                ...state,
                addingLeaves: true,
                addingLeavesError: false,
            };
        case types.ADD_LEAVES_SUCCESS:
            return {
                ...state,
                addingLeaves: false,
                addLeaveModal: false
            };
        case types.ADD_LEAVES_FAILURE:
            return {
                ...state,
                addingLeaves: false,
                addingLeavesError: true,
            };
        //GET LEAVES DETAILS

        case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_REQUEST:
            return { ...state, fetchingLeaveListRangeByUserId: true };
        case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_SUCCESS:
            return {
                ...state,
                fetchingLeaveListRangeByUserId: false,
                leaveListRangeByUserId: action.payload,
            };
        case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_FAILURE:
            return {
                ...state,
                fetchingLeaveListRangeByUserId: false,
                fetchingLeaveListRangeByUserIdError: true,
            };


        case types.GET_LEAVE_LEFT_SIDE_DETAILS_REQUEST:
            return { ...state, fetchingLeaveLeftSideData: true };
        case types.GET_LEAVE_LEFT_SIDE_DETAILS_SUCCESS:
            return {
                ...state,
                fetchingLeaveLeftSideData: false,
                leaveFetching: action.payload,
            };
        case types.GET_LEAVE_LEFT_SIDE_DETAILS_FAILURE:
            return {
                ...state,
                fetchingLeaveLeftSideData: false,
                fetchingLeaveLeftSideDataError: true,
            };
            case types.SET_LEAVE_EDIT:
                return { ...state, setEditingLeave: action.payload };
        
                case types.HANDLE_UPDATE_LEAVE_MODAL:
                  return { ...state, updateLeaveModal: action.payload };
        
                  case types.UPDATE_LEAVE_REQUEST:
                    return { ...state, updatingLeave: true };
                  case types.UPDATE_LEAVE_SUCCESS:
                    return {
                      ...state,
                      updatingLeave: false,
                      updateLeaveModal: false,
                      leaveListRangeByUserId: state.leaveListRangeByUserId.map((item) => {
                        if (item.leaveId === action.payload.leaveId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                    };
                  case types.UPDATE_LEAVE_FAILURE:
                    return {
                      ...state,
                      updatingLeave: false,
                      updatingLeaveError: true,
                    };

    }
    return state;
};
