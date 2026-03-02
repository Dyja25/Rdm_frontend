import * as types from "./RoleActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingRoles: false,
    fetchingRolesError: false,
    roles: [],

    fetchingTalentRoles: false, 
    fetchingTalentRolesError: false,
    talentRoles:[],

    addingRoles:false,
    addingRolesError:false,

    addingTalentRoles: false,
    addingTalentRolesError: false ,

    removingRoles: false,
    removingRolesError: false,

    updatingRoles: false,
    updatingRolesError: false,

    // // removingDepartments: false,
    // // removingDepartmentsError: false,

    // updatingDepartments: false,
    // updatingDepartmentsError: false,
   
};
export const rolesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ROLES_REQUEST:
            return { ...state, fetchingRoles: true };
          case types.GET_ROLES_SUCCESS:
            return { ...state, fetchingRoles: false, roles: action.payload };
          case types.GET_ROLES_FAILURE:
            return { ...state, fetchingRoles: false, fetchingRolesError: true };

            case types.ADD_ROLES_REQUEST:
              return { ...state, addingRoles: true };
            case types.ADD_ROLES_SUCCESS:
              return {
                ...state,
                addingRoles: false,
                roles: [...state.roles, action.payload],
              };
            case types.ADD_ROLES_FAILURE:
              return { ...state, addingRoles: false, addingRolesError: true };

              case types.UPDATE_ROLES_REQUEST:
                return { ...state, updatingRoles: true };
              case types.UPDATE_ROLES_SUCCESS:
                // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
                return {
                  ...state,
                  updatingRoles: false,
                  roles: state.roles.map((role) =>
                    role.roleTypeId === action.payload.roleTypeId
                      ? action.payload
                      : role
                  ),
                };
              case types.UPDATE_ROLES_FAILURE:
                return { ...state, updatingRoles: false, updatingRolesError: true };


                case types.REMOVE_ROLES_REQUEST:
                  return { ...state, removingRoles: true };
                case types.REMOVE_ROLES_SUCCESS:
                  return {
                    ...state,
                    removingRoles: false,
                    roles: state.roles.filter(
                      (item) => item.roleTypeId !== action.payload
                  ), 
                  };
                case types.REMOVE_ROLES_FAILURE:
                  return {
                    ...state,
                    removingRoles: false,
                    removingRolesError: true,
                  };

                  case types.GET_TALENT_ROLES_REQUEST:
                    return { ...state, fetchingTalentRoles: true };
                  case types.GET_TALENT_ROLES_SUCCESS:
                    return { ...state, fetchingTalentRoles: false, talentRoles: action.payload };
                  case types.GET_TALENT_ROLES_FAILURE:
                    return { ...state, fetchingTalentRoles: false, fetchingTalentRolesError: true };
        
                    case types.ADD_TALENT_ROLES_REQUEST:
                      return { ...state, addingTalentRoles: true };
                    case types.ADD_TALENT_ROLES_SUCCESS:
                      return {
                        ...state,
                        addingTalentRoles: false,
                        talentRoles: [...state.talentRoles, action.payload],
                      };
                    case types.ADD_TALENT_ROLES_FAILURE:
                      return { ...state, addingTalentRoles: false,addingTalentRolesError: true };
        



            default:
                return state;
            }
          };