import * as types from "./DepartmentActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingDepartments: false,
    fetchingDepartmentsError: false,
    departments: [],

    addingDepartments: false,
    addingDepartmentsError: false,

    // removingDepartments: false,
    // removingDepartmentsError: false,

    updatingDepartments: false,
    updatingDepartmentsError: false,
   
};

export const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_DEPARTMENTS_REQUEST:
        return { ...state, fetchingDepartments: true };
      case types.GET_DEPARTMENTS_SUCCESS:
        return { ...state, fetchingDepartments: false, departments: action.payload };
      case types.GET_DEPARTMENTS_FAILURE:
        return { ...state, fetchingDepartments: false, fetchingDepartmentsError: true };


         /**
     * add a new document 
     */
    case types.ADD_DEPARTMENTS_REQUEST:
        return { ...state, addingDepartments: true };
      case types.ADD_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          addingDepartments: false,
          departments: [...state.departments, action.payload],
        };
      case types.ADD_DEPARTMENTS_FAILURE:
        return { ...state, addingDepartments: false, addingDepartmentsError: true };


         /**
     * remove an existing DEPARTMENTS
     */
    // case types.REMOVE_DEPARTMENTS_REQUEST:
    //     return { ...state, removingDepartments: true };
    //   case types.REMOVE_DEPARTMENTS_SUCCESS:
    //     return {
    //       ...state,
    //       removingDepartments: false,
    //       departments: state.departments.filter(
    //         (department) => department.departmentId !== action.payload
    //       ),
    //     };
    //   case types.REMOVE_DEPARTMENTS_FAILURE:
    //     return { ...state, removingDepartments: false, removingDepartmentsError: true };



         /**
     * update an existing DEPARTMENTS
     */
    case types.UPDATE_DEPARTMENTS_REQUEST:
        return { ...state, updatingDepartments: true };
      case types.UPDATE_DEPARTMENTS_SUCCESS:
        // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
        return {
          ...state,
          updatingDepartments: false,
          departments: state.departments.map((department) =>
            department.departmentId === action.payload.departmentId
              ? action.payload
              : department
          ),
        };
      case types.UPDATE_DEPARTMENTS_FAILURE:
        return { ...state, updatingDepartments: false, updatingDepartmentsError: true };

        default:
            return state;
        }
      };
