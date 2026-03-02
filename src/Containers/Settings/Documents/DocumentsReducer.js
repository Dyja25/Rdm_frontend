import * as types from "./DocumentsActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingDocuments: false,
  fetchingDocumentsError: false,
  documents: [],

  addingDocuments: false,
  addingDocumentsError: false,

  removingDocuments: false,
  removingDocumentsError: false,

  updatingDocuments: false,
  updatingDocumentsError: false,
};

export const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * get the list of all documents
     */
    case types.GET_DOCUMENTS_REQUEST:
      return { ...state, fetchingDocuments: true };
    case types.GET_DOCUMENTS_SUCCESS:
      return { ...state, fetchingDocuments: false, documents: action.payload };
    case types.GET_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocuments: false,
        fetchingDocumentsError: true,
      };

    /**
     * add a new document
     */
    case types.ADD_DOCUMENTS_REQUEST:
      return { ...state, addingDocuments: true };
    case types.ADD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        addingDocuments: false,
        documents: [...state.documents, action.payload],
      };
    case types.ADD_DOCUMENTS_FAILURE:
      return { ...state, addingDocuments: false, addingDocumentsError: true };

    /**
     * remove an existing document
     */
    case types.REMOVE_DOCUMENTS_REQUEST:
      return { ...state, removingDocuments: true };
    case types.REMOVE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        removingDocuments: false,
        documents: state.documents.filter(
          (document) => document.documentTypeId !== action.payload
        ),
      };
    case types.REMOVE_DOCUMENTS_FAILURE:
      return {
        ...state,
        removingDocuments: false,
        removingDocumentsError: true,
      };

    /**
     * update an existing document
     */
    case types.UPDATE_DOCUMENTS_REQUEST:
      return { ...state, updatingDocuments: true };
    case types.UPDATE_DOCUMENTS_SUCCESS:
      // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
      return {
        ...state,
        updatingDocuments: false,
        documents: state.documents.map((document) =>
          document.documentTypeId === action.payload.documentTypeId
            ? action.payload
            : document
        ),
      };
    case types.UPDATE_DOCUMENTS_FAILURE:
      return {
        ...state,
        updatingDocuments: false,
        updatingDocumentsError: true,
      };

    default:
      return state;
  }
};
