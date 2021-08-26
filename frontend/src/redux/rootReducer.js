import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import todoReducer from "./todo/todo.reducer";
import folderReducer from "./folder/folder.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  folder: folderReducer,
});

export default rootReducer;
