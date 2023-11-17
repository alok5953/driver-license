import { getItemLocalStorage } from '../Utils/Util';
import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

} 

export const QuizService = {
    getQuizList: (pageNo, size,quiz_name) => {
        let url;
        if(quiz_name){
            url = `/api/admin/quizzes/?page=${pageNo}&size=${size}&name=${quiz_name}`
        } else{
            url = `/api/admin/quizzes/?page=${pageNo}&size=${size}`
        }
        return axios.get(baseURL +url , 
            getHeaders()
        )
    },
    addQuiz: (addQuizDetail) => {
        return axios.post(baseURL + '/api/admin/quizzes', addQuizDetail,
            getHeaders()
        )
    },
    getQuizById: (id) => {
        return axios.get(baseURL + `/api/admin/quizzes/${id}`,
            getHeaders()
        )
    },
    updateQuiz: (id, updateQuizDetail) => {
        return axios.put(baseURL + `/api/admin/quizzes/${id}`, updateQuizDetail,
            getHeaders()
        )
    },
    deleteQuiz: (id) => {
        return axios.delete(baseURL + `/api/admin/quizzes/${id}`,
            getHeaders()
        )
    }

}