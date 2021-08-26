import axios from "../../axios/axios";
import { todoActionTypes } from "./todo.types";

export const fetchFolderTodos = (folderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: todoActionTypes.FETCH_TODOS_START });
    const token = getState().user.token;
    const { data } = await axios(token).get(`/api/todo/${folderId}`);
    dispatch({ type: todoActionTypes.FETCH_TODOS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: todoActionTypes.FETCH_TODOS_FAIL, payload: error });
  }
};

export const createTodo =
  ({ folderId, title }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: todoActionTypes.FETCH_TODOS_START });
      const token = getState().user.token;
      const { data } = await axios(token).post(`/api/todo/${folderId}`, {
        title,
      });
      dispatch({ type: todoActionTypes.FETCH_TODOS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActionTypes.FETCH_TODOS_FAIL, payload: error });
    }
  };

export const deleteTodo =
  ({ todoId, folderId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: todoActionTypes.DELETE_TODO_START });
      const token = getState().user.token;
      const { data } = await axios(token).delete(
        `/api/todo/${todoId}/${folderId}`
      );
      dispatch({ type: todoActionTypes.DELETE_TODO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActionTypes.DELETE_TODO_FAIL, payload: error });
    }
  };

export const updateTodoCompletion =
  ({ id, completed, folderId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: todoActionTypes.UPDATE_TODO_START });
      const token = getState().user.token;
      const { data } = await axios(token).patch(
        `/api/todo/updateComplete/${id}/${folderId}`,
        {
          completed,
        }
      );
      dispatch({ type: todoActionTypes.UPDATE_TODO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActionTypes.UPDATE_TODO_FAIL, payload: error });
    }
  };
export const updateTodoTitle =
  ({ id, title, folderId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: todoActionTypes.UPDATE_TODO_START });
      const token = getState().user.token;
      const { data } = await axios(token).patch(
        `/api/todo/updateTitle/${id}/${folderId}`,
        {
          title,
        }
      );
      dispatch({ type: todoActionTypes.UPDATE_TODO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: todoActionTypes.UPDATE_TODO_FAIL, payload: error });
    }
  };
