import {
  USER_LOGIN_SUCCESS, USER_FORGOT_PASSWORD_SUCCESS,
  LOGOUT_USER_DETAIL_SUCCESS, USER_SIGNUP_DETAIL_SUCCESS, USER_SIGNUP_DETAIL_LIST,
  REFRESH_USER_TOKEN_SUCCESS
} from '../../Actions/ActionTypes/UserAuthTypes';
import {GET_PROFILE_USER_BY_TOKEN} from '../../Actions/ActionTypes/UserSettingTypes'


const iState = {
  userLoginData: {},
  forgotPasswordDate: {},
  userSignUpdetailList: {},
  userSignUpSuccessDetailList: {}
};

export const userAuthReducer = (state = iState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginData: action.payload
      }
    case USER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordDate: action.payload
      }
    case LOGOUT_USER_DETAIL_SUCCESS:
      return {
        userLoginData: {},
        forgotPasswordDate: {},
        userSignUpdetailList: {},
        userSignUpSuccessDetailList: {}
      }
    case USER_SIGNUP_DETAIL_LIST:
      return {
        ...state,
        userSignUpdetailList: action.payload
      }
    case USER_SIGNUP_DETAIL_SUCCESS:
      return {
        ...state,
        userLoginData: action.payload
      }
    case GET_PROFILE_USER_BY_TOKEN:
      return{
        ...state,
        userPersonalData: action.payload
      }  
    default:
      return state;
  }
};

