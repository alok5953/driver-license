
import {
  REGISTER_ADMIN_SUCCESS, GET_PERSONAL_DETAIL_SUCCESS_ON_REFRESH,
  LOGIN, LOGOUT, REFRESH_TOKEN_SUCCESS, CHANGE_PASSWORD_SUCCESS, PERSONAL_DETAIL_SUCCESS, GET_PERSONAL_DETAIL_SUCCESS, LOGOUT_DETAIL_SUCCESS
} from "../../Actions/ActionTypes/ActionTypes";

const iState = {
  sendOTPData: {},
  verifyOTPData: {},
  userData: {},
  loginData: {},
  adminSuccessData: {},
  refreshTokenResult: {},
  userDate: "",
  userTime: "",
  userMobileNo: "",
  appointmentData: {},
  userAppointmentId: '',
  changePasswordResult: {},
  personalDetailResult: {},
  getPersonalDetailData: {},
  logoutDetail: {}
};

export const authReducer = (state = iState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginData: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        loginData: action.payload
      }
    case REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
        adminSuccessData: action.payload
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordResult: action.payload
      }
    case PERSONAL_DETAIL_SUCCESS:
      return {
        ...state,
        personalDetailResult: action.payload
      }
    case GET_PERSONAL_DETAIL_SUCCESS:
      return { 
        ...state,
        getPersonalDetailData: action.payload
      }
    case LOGOUT_DETAIL_SUCCESS:
      return {
        ...state,
        logoutDetail: action.payload,
        sendOTPData: {},
        verifyOTPData: {},
        userData: {},
        loginData: {},
        adminSuccessData: {},
        refreshTokenResult: {},
        userDate: "",
        userTime: "",
        userMobileNo: "",
        appointmentData: {},
        userAppointmentId: '',
        changePasswordResult: {},
        personalDetailResult: {},
        getPersonalDetailData: {},
      }

    default:
      return state;
  }
};


