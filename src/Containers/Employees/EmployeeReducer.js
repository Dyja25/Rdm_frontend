import * as types from "./EmployeeActionType";

const initialState = {
  viewType: "table",

  addEmployeeModal: false,

  addingEmployee: false,
  addingEmployeeError: false,

  fetchingEmployee: false,
  fetchingEmployeeError: false,
  employees: [],

  SuspendStatus: false,
  SuspendStatusError: false,

  fetchingEmployeeById: false,
  fetchingEmployeeByIdError: false,
  singleEmployee: {},

  updatingEmployeeById: false,
  updatingEmployeeByIdError: false,

  fetchingNotesListByEmployeeId: false,
  fetchingNotesListByEmployeeIdError: false,
  notesListByEmployeeId: [],

  fetchingDocumentsByEmployeeId: false,
  fetchingDocumentsByEmployeeIdError: false,
  documentsByEmployeeId: [],

  deleteDocument: false,
  deleteDocumentError: false,

  documentUploadModal: false,

  addingDocumentByEmployeeId: false,
  addingDocumentByEmployeeIdError: false,

  employeeDrawerVisibleForAdmin: false,

  deleteEmployeeData:false,
  deleteEmployeeDataError:false,

  suspendedEmployee: false,
  suspendedEmployeeError: false,

  fetchingEmployeeInputSearchData: false,
  fetchingEmployeeInputSearchDataError: false,
  inputData: [],

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  addSharingEmployee: false,
  addSharingEmployeeError: false,

  EmployeeStatus: false,
  EmployeeStatusError: false,
};
export const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMPLOYEE_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.ADD_EMPLOYEE_ADDRESS:
      return {
        ...state,
        singleEmployee: {
          ...state.singleEmployee,
          address: action.payload.address,
        },
      };

    case types.UPDATE_EMPLOYEE_ADDRESS:
      return {
        ...state,
        singleEmployee: {
          ...state.singleEmployee,
          address: state.singleEmployee.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };
    case types.ADD_EMPLOYEE_REQUEST:
      return { ...state, addingEmployee: true };
    case types.ADD_EMPLOYEE_SUCCESS:
      return { ...state, addingEmployee: false, addEmployeeModal: false };
    case types.ADD_EMPLOYEE_FAILURE:
      return { ...state, addingEmployee: false, addingEmployeeError: true };


       case types.DELETE_EMPLOYEE_DATA_REQUEST:
                  return { ...state, deleteEmployeeData: true };
                case types.DELETE_EMPLOYEE_DATA_SUCCESS:
                  return {
                    ...state,
                    deleteEmployeeData: false,
                  
                    employees: state.employees.filter(
                      (item) => item.employeeId !== action.payload
                    ),
                  };
                case types.DELETE_EMPLOYEE_DATA_FAILURE:
                  return { ...state, deleteEmployeeData: false, deleteEmployeeDataError: false };

    case types.GET_EMPLOYEE_LIST_REQUEST:
      return { ...state, fetchingEmployee: true };
    case types.GET_EMPLOYEE_LIST_SUCCESS:
      return { ...state, fetchingEmployee: false, employees: action.payload };
    case types.GET_EMPLOYEE_LIST_FAILURE:
      return { ...state, fetchingEmployee: false, fetchingEmployeeError: true };

    case types.SET_CLEARBIT_DATA:
      return { ...state, clearbit: action.payload };

    //updating employee by Id
    case types.UPDATE_EMPLOYEE_BY_ID_REQUEST:
      return { ...state, updatingEmployeeById: true };
    case types.UPDATE_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        updatingEmployeeById: false,
        singleEmployee: action.payload,
      };
    case types.UPDATE_EMPLOYEE_BY_ID_FAILURE:
      return {
        ...state,
        updatingEmployeeById: false,
        updatingEmployeeByIdError: true,
      };

    //get single account by ID
    case types.GET_EMPLOYEE_BY_ID_REQUEST:
      return { ...state, fetchingEmployeeById: true };
    case types.GET_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingEmployeeById: false,
        singleEmployee: action.payload,
      };
    case types.GET_EMPLOYEE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingEmployeeById: false,
        fetchingEmployeeByIdError: true,
      };

    case types.HANDLE_EMPLOYEE_MODAL:
      return { ...state, addEmployeeModal: action.payload };

    /**
     * Employee Notes
     */

    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_REQUEST:
      return { ...state, fetchingNotesListByEmployeeId: true };
    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByEmployeeId: false,
        notesListByEmployeeId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByEmployeeId: false,
        fetchingNotesListByEmployeeIdError: true,
      };

    /**
     * get list of documents of an employee
     */
    case types.GET_EMPLOYEE_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: true,
        fetchingDocumentsByEmployeeIdError: false,
      };
    case types.GET_EMPLOYEE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: false,
        fetchingDocumentsByEmployeeIdError: false,
        documentsByEmployeeId: action.payload,
      };
    case types.GET_EMPLOYEE_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: false,
        fetchingDocumentsByEmployeeIdError: true,
      };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByEmployeeId: state.documentsByEmployeeId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /**
     * handle upload document  modal
     */
    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    /**
     * add/link employee
     */
    case types.ADD_EMPLOYEE_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByEmployeeId: true,
        addingDocumentByEmployeeIdError: false,
      };
    case types.ADD_EMPLOYEE_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByEmployeeId: false,
        // documentsByEmployeeId
       documentsByEmployeeId: [action.payload, ...state.documentsByEmployeeId],
      };
    case types.ADD_EMPLOYEE_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByEmployeeId: false,
        addingDocumentByEmployeeIdError: true,
      };

    case types.HANDLE_EMPLOYEE_DRAWER_FOR_ADMIN:
      return {
        ...state,
        employeeDrawerVisibleForAdmin: action.payload.isVisible,
      };

    //suspend
    case types.SUSPEND_EMPLOYEE_REQUEST:
      return { ...state, suspendedEmployee: true };
    case types.SUSPEND_EMPLOYEE_SUCCESS:
      return {
        ...state,
        suspendedEmployee: false,
        addTeamTransferModal: false,
      };
    case types.SUSPEND_EMPLOYEE_FAILURE:
      return {
        ...state,
        suspendedEmployee: false,
        suspendedEmployeeError: true,
      };

           //SEARCH
    case types.INPUT_EMPLOYEE_SEARCH_DATA_REQUEST:
      return { ...state, fetchingEmployeeInputSearchData: true };
    case types.INPUT_EMPLOYEE_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingEmployeeInputSearchData: false,
        employees: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_EMPLOYEE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingEmployeeInputSearchDataError: true };

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
      case types.ADD_SHARE_EMPLOYEE_PERMISSION_REQUEST:
        return { ...state, addSharingEmployee: true };
    
      case types.ADD_SHARE_EMPLOYEE_PERMISSION_SUCCESS:
        return { ...state, addSharingEmployee: false, shareEmployee: action.payload };
    
      case types.ADD_SHARE_EMPLOYEE_PERMISSION_FAILURE:
        return {
          ...state,
          addSharingEmployee: false,
          addSharingEmployeeError: true,
        };


        case types.SUSPEND_STATUS_REQUEST:
      return { ...state, SuspendStatus: true };
    case types.SUSPEND_STATUS_SUCCESS:
      return {
        ...state,
        SuspendStatus: false,
        // addTeamTransferModal: false,
      };
    case types.SUSPEND_STATUS_FAILURE:
      return {
        ...state,
        SuspendStatus: false,
        SuspendStatusError: true,
      };
      
      

        case types.EMPLOYEE_STATUS_REQUEST:
          return {
            ...state,
            EmployeeStatus: true,
          };
        case types.EMPLOYEE_STATUS_SUCCESS:
          return {
            ...state,
            EmployeeStatus: false,
            employees:state.employees.map((item)=>{
              if(item.employeeId === action.payload.employeeId){
                return {...item,instockInd:action.payload.instockInd}
              }
              else{
                return item
              }
    
            })
          };
        case types.EMPLOYEE_STATUS_FAILURE:
          return {
            ...state,
            EmployeeStatus: false,
            EmployeeStatusError: true,
          };

      default:
      return state;
  }
};
