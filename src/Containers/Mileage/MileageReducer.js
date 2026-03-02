import * as types from "./MileageActionTypes";

const initialState = {
  addingMileage: false,
  addingMileageError: false,

  addMileageModal: false,

  fetchingMileageByUserId: false,
  fetchingMileageByUserIdError: false,
  MileageDat: [],

  fetchingMileageByVoucherId: false,
  fetchingMileageByVoucherIdError: false,
  mileageVoucherId: [],

  setEditingMileage:{},
  updateMileageModal:false,

  updatingMileage: false,
  updatingMileageError: false,

};

export const mileageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_MILEAGE_MODAL:
      return { ...state, addMileageModal: action.payload };

    case types.ADD_MILEAGE_REQUEST:
      return { ...state, addingMileage: true };
    case types.ADD_MILEAGE_SUCCESS:
      return { ...state, addingMileage: false, addMileageModal: false };
    case types.ADD_MILEAGE_FAILURE:
      return { ...state, addingMileage: false, addingMileageError: true };

    case types.GET_MILEAGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingMileageByUserId: true };
    case types.GET_MILEAGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingMileageByUserId: false,
        MileageDat: action.payload,
      };
    case types.GET_MILEAGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingMileageByUserId: false,
        fetchingMileageByUserIdError: true,
      };

    case types.GET_MILEAGE_BY_VOUCHER_ID_REQUEST:
      return { ...state, fetchingMileageByVoucherId: true };
    case types.GET_MILEAGE_BY_VOUCHER_ID_SUCCESS:
      return {
        ...state,
        fetchingMileageByVoucherId: false,
        mileageVoucherId: action.payload,
      };
    case types.GET_MILEAGE_BY_VOUCHER_ID_FAILURE:
      return {
        ...state,
        fetchingMileageByVoucherId: false,
        fetchingMileageByVoucherIdError: true,
      };

      case types.SET_MILEAGE_EDIT:
        return { ...state, setEditingMileage: action.payload };

        case types.HANDLE_UPDATE_MILEAGE_MODAL:
          return { ...state, updateMileageModal: action.payload };

          case types.UPDATE_MILEAGE_REQUEST:
            return { ...state, updatingMileage: true };
          case types.UPDATE_MILEAGE_SUCCESS:
            return {
              ...state,
              updatingMileage: false,
              updateMileageModal: false,
              mileageVoucherId: state.mileageVoucherId.map((item) => {
                if (item.mileageId === action.payload.mileageId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.UPDATE_MILEAGE_FAILURE:
            return {
              ...state,
              updatingMileage: false,
              updatingMileageError: true,
            };

  }
  return state;
};
