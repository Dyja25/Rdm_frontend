import * as types from "./CertificationActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingCertifications: false,
    fetchingCertificationsError: false,
    certifications: [],

    addingCertifications: false, 
    addingCertificationsError: false,

    removingCertifications: false, 
    removingCertificationsError: false,

    updatingCertifications: false, 
    updatingCertificationsError: false ,


    fetchingCertificationInputSearchData:false,
    fetchingCertificationInputSearchDataError:false,

};

export const certificationReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Certification
     */
    case types.GET_CERTIFICATION_REQUEST:
        return { ...state, fetchingCertifications: true };
      case types.GET_CERTIFICATION_SUCCESS:
        return { ...state, fetchingCertifications: false, 
            certifications: action.payload };
      case types.GET_CERTIFICATION_FAILURE:
        return { ...state,
             fetchingCertifications: false,
             fetchingCertificationsError: true };


         /**
     * add a new document 
     */
    case types.ADD_CERTIFICATION_REQUEST:
        return { ...state, addingCertifications: true };
      case types.ADD_CERTIFICATION_REQUEST:
        return {
          ...state,
          addingCertifications: false,
          certifications: [...state.certifications, action.payload],
        };
      case types.ADD_CERTIFICATION_REQUEST:
        return { ...state, 
            addingCertifications: false, 
            addingCertificationsError: true };


         /**
     * remove an existing Certification
     */
    case types.REMOVE_CERTIFICATION_REQUEST:
        return { ...state, removingCertifications: true };
      case types.REMOVE_CERTIFICATION_SUCCESS:
        return {
          ...state,
          removingCertifications: false,
          certifications: state.certifications.filter(
            (item) => item.certificationId !== action.payload
        ),
        };
      case types.REMOVE_CERTIFICATION_FAILURE:
        return { ...state, 
            removingCertifications: false, 
            removingCertificationsError: true };



         /**
     * update an existing Certification
     */
    case types.UPDATE_CERTIFICATION_REQUEST:
        return { ...state, updatingCertifications: true };
      case types.UPDATE_CERTIFICATION_SUCCESS:
        // return { ...state, updatingDesignations: false, Designations: [...state.Designations, action.payload] };
        return {
          ...state,
          updatingCertifications: false,
          certifications: state.certifications.map((certification) =>
          certification.certificationId === action.payload.certificationId
              ? action.payload
              : certification
          ),
        };
      case types.UPDATE_CERTIFICATION_FAILURE:
        return { ...state,
             updatingCertifications: false, 
            updatingCertificationsError: true };

        case types.GET_CERTIFICATION_SEARCH_REQUEST:
          return { ...state, fetchingCertificationInputSearchData: true };
        case types.GET_CERTIFICATION_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingCertificationInputSearchData: false,
            certifications: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_CERTIFICATION_SEARCH_FAILURE:
          return { ...state, fetchingCertificationInputSearchDataError: true };

        default:
            return state;
        }
      };
