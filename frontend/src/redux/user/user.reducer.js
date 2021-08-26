import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  profile: {},
  token: "",
  loading: false,
  error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGNUP_START:
    case userActionTypes.LOGIN_START:
    case userActionTypes.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        profile: action.payload.user,
        token: action.payload.token,
      };
    case userActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case userActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        token: "",
        profile: {},
      };

    case userActionTypes.LOGIN_FAIL:
    case userActionTypes.SIGNUP_FAIL:
    case userActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
