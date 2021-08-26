import { todoActionTypes } from "./todo.types";

const INITIAL_STATE = {
  todos: [],
  currentTodo: {},
  loading: false,
  error: "",
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case todoActionTypes.UPDATE_TODO_START:
    case todoActionTypes.FETCH_TODOS_START:
    case todoActionTypes.FETCH_TODO_START:
    case todoActionTypes.CREATE_TODO_START:
    case todoActionTypes.DELETE_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case todoActionTypes.CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case todoActionTypes.FETCH_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        currentTodo: action.payload,
      };
    case todoActionTypes.UPDATE_TODO_SUCCESS:
    case todoActionTypes.FETCH_TODOS_SUCCESS:
    case todoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        todos: action.payload,
      };
    case todoActionTypes.UPDATE_TODO_FAIL:
    case todoActionTypes.FETCH_TODOS_FAIL:
    case todoActionTypes.FETCH_TODO_FAIL:
    case todoActionTypes.CREATE_TODO_FAIL:
    case todoActionTypes.DELETE_TODO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
