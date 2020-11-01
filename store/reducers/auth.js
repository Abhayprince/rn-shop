import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  DID_TRY_AUTO_LOGIN,
  LOGOUT,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    //   console.log("LOGIN Reducer", action);
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case DID_TRY_AUTO_LOGIN:
      return { ...state, didTryAutoLogin: true };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
