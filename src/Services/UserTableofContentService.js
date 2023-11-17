import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}


export const userTableofContentService = {

    getTableofContentList: (course_id) => {
        return axios.get(baseURL +`/api/course/module?course_id=${course_id}`,getHeaders())
    },
    getCourseInfoById: (id) => {
        return axios.get(baseURL +`/api/course/${id}`,getHeaders())
    }

}