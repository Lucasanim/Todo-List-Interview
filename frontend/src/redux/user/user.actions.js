import { userActionTypes } from "./user.types";
import axios from "../../axios/axios";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.LOGIN_START });
    const { data } = await axios().post("/api/auth/signin", credentials);
    dispatch({ type: userActionTypes.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: userActionTypes.LOGIN_FAIL, payload: error });
  }
};

export const sigup = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.SIGNUP_START });
    const { data } = await axios().post("/api/auth/signup", credentials);
    dispatch({ type: userActionTypes.SIGNUP_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: userActionTypes.SIGNUP_FAIL, payload: error });
  }
};

export const sigout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userActionTypes.LOGOUT_START });
    const token = getState().user.token;
    const { data } = await axios(token).post("/api/auth/signout");
    dispatch({ type: userActionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: userActionTypes.LOGOUT_FAIL, payload: error });
  }
};
