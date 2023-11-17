import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}


export const userSecurityQuestionService = {

    getUserSecurityQuestion: (course_id) => {
        return axios.get(baseURL +`/api/course/module?course_id=${course_id}`,getHeaders())
    },
    saveSecurityQuestionAnswer: (detail) =>{
      return axios.post(baseURL +`/api/user/security-questions/answer`,detail,getHeaders())
    },
    securityQuestionAnswerVerify: (detail) =>{
      return axios.post(baseURL +`/api/user/security-questions/verify`,detail, getHeaders())
    },
    checkUserSecurityQuestionDoneOrNot:() =>{ // it will check on signup process
     
      return axios.get(baseURL +`/api/user/security-questions/is-done`, getHeaders())
    }
}