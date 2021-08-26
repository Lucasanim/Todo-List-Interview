import axios from "../../axios/axios";
import { folderActionTypes } from "./folder.types";

export const fetchFolders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: folderActionTypes.FETCH_FOLDERS_START });
    const token = getState().user.token;
    const { data } = await axios(token).get("/api/folder");
    dispatch({ type: folderActionTypes.FETCH_FOLDERS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: folderActionTypes.FETCH_FOLDERS_FAIL, payload: error });
  }
};

export const createFolder = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: folderActionTypes.CREATE_FOLDER_START });
    const token = getState().user.token;
    const { data } = await axios(token).post("/api/folder", { name });
    dispatch({ type: folderActionTypes.CREATE_FOLDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: folderActionTypes.CREATE_FOLDER_FAIL, payload: error });
  }
};

export const deleteFolder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: folderActionTypes.DELETE_FOLDER_START });
    const token = getState().user.token;
    const { data } = await axios(token).delete(`/api/folder/${id}`);
    dispatch({ type: folderActionTypes.DELETE_FOLDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: folderActionTypes.DELETE_FOLDER_FAIL, payload: error });
  }
};
