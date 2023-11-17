import axios from 'axios';
import { getItemLocalStorage } from '../Utils/Util';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}


export const UserAuthService = {
  userLogin: (data) => {
    return axios.post(baseURL + '/api/user/signin', data)
  },
  userForgotPassword: (data) => {
    return axios.post(baseURL + '/api/user/user-forgot-password', data)
  },
  logout: (data) =>{
    return axios.get(baseURL + '/api/admin/auth/logout', getHeaders())
  },
  userSignUp: (data) =>{
    return axios.post(baseURL + '/api/user/signup',data)
  },
  getUserRefreshToken: (data) =>{
    return axios.post(baseURL + '/api/admin/auth/refresh-token', data, getHeaders())
  },
  getUserDetailByEmailIdOrUserName: (email,course_Id) =>{
    return axios.get(baseURL + `/api/user/getUserDetailByEmailOrUsername?email=${email}&course_id=${course_Id}`)
  },
  updateUserProfile: (data) =>{
    return axios.put(baseURL + '/api/user/userUpdateProfile', data, getHeaders())
  },
  getProfileUserByToken: (data) =>{
    return axios.get(baseURL + '/api/user/getUserDetail', getHeaders())
  },
  userChangePassword:  (data) =>{
    return axios.put(baseURL + '/api/user/userChangePassword', data, getHeaders())
  },
  userVerifyOtp:  (data) =>{
    return axios.post(baseURL + '/api/user/user-verify-otp',data, getHeaders())
  },
  userResetPassword:  (data) =>{
    return axios.post(baseURL + '/api/user/user-reset-password',data, getHeaders())
  },
  userResendVerifyEmail: (data) =>{
    return axios.post(baseURL + '/api/user/resend-verification-email',data, getHeaders())
  }
} 