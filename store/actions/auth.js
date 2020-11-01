import * as api from "../../services/api-service";
import * as storage from "../../services/storage-service";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const AUTHENTICATE = "AUTHENTICATE";
export const DID_TRY_AUTO_LOGIN = "DID_TRY_AUTO_LOGIN";
export const LOGOUT = "LOGOUT";

const apiKey = "AIzaSyBHKRTjVMQS2RuBxZoMMorAznRwbq14zPE";
const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const signinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

const ErrorMessages = {
  //Signup Errors
  EMAIL_EXISTS: "The email address is already in use by another account.",
  OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "We have blocked all requests from this device due to unusual activity. Try again later.",
  // Login Errors
  EMAIL_NOT_FOUND:
    "There is no user record corresponding to this identifier. The user may have been deleted.",
  INVALID_PASSWORD:
    "The password is invalid or the user does not have a password.",
  USER_DISABLED: "The user account has been disabled by an administrator.",
};

let timer;

export const tryAutoLogin = () => ({ type: DID_TRY_AUTO_LOGIN });

export const authenticate = (token, userId, expiryTimeMs) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
      console.log("Auto logout");
    }, expiryTimeMs);
    return dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const logout = () => {
  return (dispatch) => {
    if (timer) {
      clearTimeout(timer);
    }
    storage.readFromStorage();
    dispatch({ type: LOGOUT });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await api.postWithFullUrl(signinUrl, {
        email,
        password,
        returnSecureToken: true,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        /*
            errorResponse is
            {
                "error": {
                    "errors": [
                        {
                            "domain": "global",
                            "reason": "invalid",
                            "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
                        }
                    ],
                    "code": 400,
                    "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
                }
            }
          */
        const errorMessage =
          ErrorMessages[errorResponse.error.message] ||
          "Something went wrong while trying to sign in";
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      /*
      responseData is{
        "displayName": "",
        "email": "test@test.com",
        "expiresIn": "3600",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6InJuLXNob3AtNjM5OTEiLCJpYXQiOjE2MDQxNjU5MTMsImV4cCI6MTYwNTM3NTUxMywidXNlcl9pZCI6IjVvd2Y4ZWluZUxkRjdFWmdIZ1hDb1I3enQ2STMiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQiLCJ2ZXJpZmllZCI6ZmFsc2V9.rMBZP4Swka2H6gNyd0RNOaI4B5kYHiV7BCM0GuJSN_AIf5cfABmhvrAW8s37zLkYUCpLdd-5rP6Bs5Jp-dNLWEYybEnwc6rUSBQvd36p-APMHj4f2aVWMiB4mSydyhdQkPDWnYXNnShWSotigAD04-5UaLuGo3HimOest4abLJ_xOv3gfMVzSaaMk9jxcks5KJQzgrccKMq1XscXNIskry5H_Ddg4UnAkIZsD5g6PuSlr2jvPpOTu63D1xoFTAAUuxE2Otrf9m8tvqH_WcxrzZep9_gp4a83uT6D-fLapeC-_pm70Isp9PexPQ3LR3McPwRmtmG21T6_xmwePtGwAA",
        "kind": "identitytoolkit#VerifyPasswordResponse",
        "localId": "5owf8eineLdF7EZgHgXCoR7zt6I3",  //UserId
        "registered": true,
        }
    */
      console.log("login", responseData);
      const { idToken, localId, expiresIn } = responseData;

      if (idToken && localId && expiresIn) {
        const currentTimeMs = new Date().getTime();
        const expireInMs = +expiresIn * 1000; // As expiresIn is in Seconds
        const expirationDate = new Date(currentTimeMs + expireInMs);
        storage.saveToStorage(idToken, localId, expirationDate);

        dispatch(authenticate(idToken, localId, expireInMs));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await api.postWithFullUrl(signupUrl, {
        email,
        password,
        returnSecureToken: true,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        /*
            errorResponse is
            {
                "error": {
                    "errors": [
                        {
                            "domain": "global",
                            "reason": "invalid",
                            "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
                        }
                    ],
                    "code": 400,
                    "message": "CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
                }
            }
          */
        const errorMessage =
          ErrorMessages[errorResponse.error.message] ||
          "Something went wrong while trying to sign up";
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      /*
      responseData is {
        "email": "test@test.com",
        "expiresIn": "3600",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxMGM4ZjhiMGRjN2Y1NWUyYjM1NDFmMjllNWFjMzc0M2Y3N2NjZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tc2hvcC02Mzk5MSIsImF1ZCI6InJuLXNob3AtNjM5OTEiLCJhdXRoX3RpbWUiOjE2MDQxNjU4MDcsInVzZXJfaWQiOiI1b3dmOGVpbmVMZEY3RVpnSGdYQ29SN3p0NkkzIiwic3ViIjoiNW93ZjhlaW5lTGRGN0VaZ0hnWENvUjd6dDZJMyIsImlhdCI6MTYwNDE2NTgwNywiZXhwIjoxNjA0MTY5NDA3LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.H1tp1s1aXW_633CZQwGpebeMw8QMwqo9CnYxFxOOMz6IIoDv5eA91ZYO0e62lNxp8uXkXyM40uO15qgtTUwCeoUeMyVuv_4Z8DdcQwGNc5ztgFoA-aMUuet-afFRujBdF7boiXDhGJAdc2m122vsLnfRxQtl8goc5NXyzokpqQ2XofxIqRh5bKunDJaHpQaxBoNslOp8vWhVjkP1pimXDoyA3Hxv_BC-Ea8woknGdyisJT6BO8FqSFEg6h6ByO0u2OModS8gPRpWuoCPPiT_-u5QPY_Lpf-c9aHq-KEO4WRY-TpgEmadlj4GLbi1ylfZ-83A98fXPACSpw5rJMoD-A",
        "kind": "identitytoolkit#SignupNewUserResponse",
        "localId": "5owf8eineLdF7EZgHgXCoR7zt6I3",  //UserId
        "refreshToken": "AG8BCneJqxbgDqN5iVZRyy-I3MSXNSwCtboJnDYJBwH2MwBe4UiZt7iUerSfW0CNkjFCMfRMalg_Q3uMubOFSrZiEygP-jRMcjTO7Sts972ufqvhStZhSovt3IbhD8bl-tLe2pu6mFbSof20ER1zg99DRHend0WzA-N7hGUYTdvJUtZd07_Bo5iaC2YGQq5SIZqYL2VvC1ye",
        }
*/
      const { idToken, localId, expiresIn } = responseData;

      if (idToken && localId && expiresIn) {
        const currentTimeMs = new Date().getTime();
        const expireInMs = +expiresIn * 1000; // As expiresIn is in Seconds
        const expirationDate = new Date(currentTimeMs + expireInMs);
        storage.saveToStorage(idToken, localId, expirationDate);
        dispatch(authenticate(idToken, localId, expireInMs));
      }
    } catch (error) {
      throw error;
    }
  };
};
