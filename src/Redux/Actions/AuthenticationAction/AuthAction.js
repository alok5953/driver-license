

import { loadingAction } from "./../LoadingAction";
import { AuthService } from '../../../Services/AuthService'
import { removeItemLocalStorage } from '../../../Utils/Util';
import {
  LOGIN, REGISTER_ADMIN_SUCCESS, REFRESH_TOKEN_SUCCESS, CHANGE_PASSWORD_SUCCESS, PERSONAL_DETAIL_SUCCESS,
  GET_PERSONAL_DETAIL_SUCCESS, LOGOUT_DETAIL_SUCCESS, FORGET_PASSWORD_SUCCESS, FORGOT_PASSWORD_CONTAIN_EMAIL, FORGOT_PASSWORD_CONTAIN_OTP,
  PASSWORD_RESET_SUCCESS, OTP_VERIFY_SUCCESS
} from '../ActionTypes/ActionTypes'

export const userDataAction = (data, type) => {
  return (dispatch) => {
    dispatch({ type: type, payload: data });
  };
};

export const loginAction = (data, type) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.login(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: type, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const logoutAction = (data, type) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.logout()
      .then(response => {
        localStorage.clear();
        return dispatch({ type: LOGOUT_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        localStorage.clear();
        dispatch(loadingAction(false));
        throw err;
      });

  }
}

export const registerAdminAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.registerAdmin(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const refreshTokenAction = (data) => {
  return (dispatch) => {
    return AuthService.getRefreshToken(data)
      .then(response => {
        return dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

// change password
export const changePasswordAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.changePassword(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

// update personal detail
export const personalDetailUpdate = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.updatePersonalDetail(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: PERSONAL_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

// get personal detail
export const getPersonalDetailAction = (data) => {
  return (dispatch) => {
  //  dispatch(loadingAction(true));
    return AuthService.getPersonalDetail(data)
      .then(response => {
        dispatch(loadingAction(false));
        // dispatch ({type: LOGIN, payload: response});
        return dispatch({ type: GET_PERSONAL_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

export const forgotPassAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.forgotPassword(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const forgotPassworForEmaildAction = (email) => {
  return (dispatch) => {
      const data = {
          data: {
              code:200,
              email: email,
          }
      }
      return dispatch({type: FORGOT_PASSWORD_CONTAIN_EMAIL, payload: data})
  }
}

export const forgotPassworForOTPldAction = (otp) => {
  return (dispatch) => {
      const data = {
          data: {
              code:200,
              otp: otp,
          }
      }
      return dispatch({type: FORGOT_PASSWORD_CONTAIN_OTP, payload: data})
  }
}

export const OTPverifyAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.verifyOtp(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: OTP_VERIFY_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const passwordResetAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AuthService.resetPassword(data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: PASSWORD_RESET_SUCCESS, payload: response });
      })
      .catch(err => {
        console.log('********',err)
        dispatch(loadingAction(false));
        throw err;
      });
  };
}; 
