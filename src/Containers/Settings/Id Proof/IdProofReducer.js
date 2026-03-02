import * as types from "./IdProofActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingIdProofs: false,
    fetchingIdProofsError: false,
    idProofs: [],

    addingIdProofs: false,
    addingIdProofsError: false,

    
    updatingIdProofs: false,
    updatingIdProofsError: false,

   
};

export const idProofsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_ID_PROOF_REQUEST:
        return { ...state, fetchingIdProofs: true };
      case types.GET_ID_PROOF_SUCCESS:
        return { ...state, fetchingIdProofs: false,
           idProofs: action.payload };
      case types.GET_ID_PROOF_FAILURE:
        return { ...state, fetchingIdProofs: false,
           fetchingIdProofsError: true };


         /**
     * add a new document 
     */
    case types.ADD_ID_PROOF_REQUEST:
        return { ...state, addingIdProofs: true };
      case types.ADD_ID_PROOF_SUCCESS:
        return {
          ...state,
          addingIdProofs: false,
          idProofs: [...state.idProofs, action.payload],
        };
      case types.ADD_ID_PROOF_FAILURE:
        return {
          ...state,
           addingIdProofs: false,
           addingIdProofsError: true
           };


         /**
     * update an existing DESIGNATIONS
     */
    case types.UPDATE_ID_PROOF_REQUEST:
        return { ...state, updatingIdProofs: true };
      case types.UPDATE_ID_PROOF_SUCCESS:
        // return { ...state, updatingDesignations: false, Designations: [...state.Designations, action.payload] };
        return {
          ...state,
          updatingIdProofs: false,
          idProofs: state.idProofs.map((idProof) =>
            idProof.idProofTypeId === action.payload.idProofTypeId
              ? action.payload
              : idProof
          ),
        };
      case types.UPDATE_ID_PROOF_FAILURE:
        return { 
          ...state,
           updatingIdProofs: false,
           updatingIdProofsError: true };

        default:
            return state;
        }
      };
