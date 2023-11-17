import axios from 'axios';
import {getItemLocalStorage} from '../Utils/Util';
import { baseURL } from './BaseApi';
const getHeaders = () => {
  const accessToken = localStorage.getItem('accessToken')
 return { headers:  {"authorization" : `Bearer ${accessToken}`,Accept: 'application/json'} };

}

export const AuthService = {
  login: (data) => {
    return axios.post(baseURL + '/api/admin/auth/login', data)
  },
  registerAdmin: (data) => {
    return axios.post(baseURL + '/api/admin/users', data, getHeaders())
  },
  getRefreshToken: (data) =>{
    return axios.post(baseURL + '/api/admin/auth/refresh-token', data, getHeaders())
  },
  changePassword: (data) => {
    return axios.put(baseURL + '/api/admin/auth/change-password', data, getHeaders())
  },
  updatePersonalDetail: (data) => {
    return axios.put(baseURL + '/api/admin/auth/profile', data, getHeaders())
  },
  getPersonalDetail: () =>{
    return axios.get(baseURL + '/api/admin/auth/profile', getHeaders())
  },
  logout: () =>{
    return axios.get(baseURL + '/api/admin/auth/logout', getHeaders())
  },
  forgotPassword: (data) =>{
    return axios.post(baseURL + '/api/admin/auth/forgot-password',data, getHeaders())
  },
  verifyOtp:  (data) =>{
    return axios.post(baseURL + '/api/admin/auth/verify-otp',data, getHeaders())
  },
  resetPassword:  (data) =>{
    return axios.post(baseURL + '/api/admin/auth/reset-password',data, getHeaders())
  }
}