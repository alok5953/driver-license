import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { UserAuthService } from '../../../Services/UserAuthService'
import {
  USER_DETAIL_SUCCESS, USER_PROFILE_UPDATE_DETAIL_SUCCESS, GET_PROFILE_USER_BY_TOKEN, CHANGE_USER_PASSWORD_SUCCESS
} from '../ActionTypes/UserSettingTypes'

export const getUserDetailByEmailOrUserAction = (email, user_name) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.getUserDetailByEmailIdOrUserName(email, user_name)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

export const updateUserProfileAction = (userDetail) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.updateUserProfile(userDetail)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_PROFILE_UPDATE_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}

export const getUserDetailByTokenAction = (email, user_name) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.getProfileUserByToken(email, user_name)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: GET_PROFILE_USER_BY_TOKEN, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}; 

export const changeUserPasswordAction = (userPasswordDetail) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserAuthService.userChangePassword(userPasswordDetail)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: CHANGE_USER_PASSWORD_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
}