import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}


export const userQuizQuestionService = {

    getQuizQuestionById: (id) => {
        return axios.get(baseURL + `/api/admin/quizzes/${id}`, getHeaders()

        )
    },
    quizAnswerVerify: (detail) =>{
      return axios.post(baseURL +`/api/user/quiz/verify`,detail, getHeaders())
    }
}