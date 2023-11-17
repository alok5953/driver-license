import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { UserAuthService } from '../../../Services/UserAuthService'
import {
  USER_LOGIN_SUCCESS, USER_FORGOT_PASSWORD_SUCCESS,
  LOGOUT_USER_DETAIL_SUCCESS, USER_SIGNUP_DETAIL_SUCCESS, USER_SIGNUP_DETAIL_LIST,
  REFRESH_USER_TOKEN_SUCCESS, USER_PASSWORD_RESET_SUCCESS, USER_OTP_VERIFY_SUCCESS,
  USER_RESEND_VERIFY_EMAIL_SUCCESS
} from '../ActionTypes/UserAuthTypes'


export const userLoginAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userLogin(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const userForgotPasswordAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userForgotPassword(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const logoutUserAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    // return UserAuthService.logout()
    //   .then(response => {
      sessionStorage.clear();
      dispatch(loadingAction(false));
        return dispatch({ type: LOGOUT_USER_DETAIL_SUCCESS, payload: {} });
      // })
      // .catch(err => {
      //   window.localStorage.clear();
      //   window.sessionStorage.clear()
      //   dispatch(loadingAction(false));
      //   throw err;
      // });

  } 
}

export const singUpDetailSaveInReduxAction = (data) => {
  return (dispatch) => {
    dispatch({ type: USER_SIGNUP_DETAIL_LIST, payload: data });
  };
}

export const userSignUpAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userSignUp(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_SIGNUP_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const refreshUserTokenAction = (data) => {
  return (dispatch) => {
    return UserAuthService.getUserRefreshToken(data)
      .then(response => {
        return dispatch({ type: REFRESH_USER_TOKEN_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

export const userOTPverifyAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userVerifyOtp(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_OTP_VERIFY_SUCCESS, payload: response });
      })
      .catch(err => {
        console.log('********',err)
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const userPasswordResetAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userResetPassword(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: response });
      })
      .catch(err => {
        console.log('********',err)
        dispatch(loadingAction(false));
        throw err;
      });
  };
}; 
export const userResendVerifyEmailAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userResendVerifyEmail(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_RESEND_VERIFY_EMAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        console.log('********',err)
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

