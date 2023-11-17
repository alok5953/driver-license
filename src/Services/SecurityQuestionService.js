import { getItemLocalStorage } from '../Utils/Util';
import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    var accessToken
    if(!sessionStorage.getItem('userAccessToken')){
        accessToken = localStorage.getItem('accessToken')
    } else{
        accessToken = sessionStorage.getItem('userAccessToken')
    }
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const SecurityQuestionService = {
    getSecurityQuestionList: (pageNo, size) => {
        return axios.get(baseURL + `/api/admin/security-questions/?page=${pageNo}&size=${size}`, 
            getHeaders())
    },
    addSecurityQuestion: (addSecurityQuestionDetailDetail) => {
        return axios.post(baseURL + '/api/admin/security-questions', addSecurityQuestionDetailDetail,
            getHeaders()
        )
    },
    getSecurityQuestionById: (id) => {
        return axios.get(baseURL + `/api/admin/security-questions/${id}`,
            getHeaders()
        )
    },
    updateSecurityQuestion: (id, updateSecurityQuestionDetailDetail) => {
        return axios.put(baseURL + `/api/admin/security-questions/${id}`, updateSecurityQuestionDetailDetail,
            getHeaders()
        )
    },
    deleteSecurityQuestion: (id) => {
        return axios.delete(baseURL + `/api/admin/security-questions/${id}`,
            getHeaders()
        )
    },
    updateSecurityQuestionStatus: (id, updateSecurityQuestionStatusDetail) => {
        return axios.patch(baseURL + `/api/admin/security-questions/${id}`, updateSecurityQuestionStatusDetail,
            getHeaders()
        )
    }

}