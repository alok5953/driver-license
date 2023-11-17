import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
}


export const userRecordSurveyService = {

    updateUserSurvey: (data) => {
        return axios.patch(baseURL + `/api/user/record-survey`,data, getHeaders()

    )
  },

  userFeedbackCheck: () => {
    return axios.get(baseURL + '/api/user/check-record-survey', getHeaders())
  }

}