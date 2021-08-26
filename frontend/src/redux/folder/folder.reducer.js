import { folderActionTypes } from "./folder.types";

const INITIAL_STATE = {
  folders: [],
  loading: false,
  error: "",
};

const folderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case folderActionTypes.CREATE_FOLDER_START:
    case folderActionTypes.FETCH_FOLDERS_START:
    case folderActionTypes.DELETE_FOLDER_START:
      return {
        ...state,
        loading: true,
      };
    case folderActionTypes.CREATE_FOLDER_SUCCESS:
    case folderActionTypes.FETCH_FOLDERS_SUCCESS:
    case folderActionTypes.DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        folders: action.payload,
      };
    // return {
    //   ...state,
    //   loading: false,
    //   error: ''
    // }
    // return {
    //   ...state,
    //   loading: false,
    //   error: ''
    // }
    case folderActionTypes.CREATE_FOLDER_FAIL:
    case folderActionTypes.FETCH_FOLDERS_FAIL:
    case folderActionTypes.DELETE_FOLDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default folderReducer;
