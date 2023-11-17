import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
  const accessToken = sessionStorage.getItem('userAccessToken')
  return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const UserCourseService = {

  getCourseList: () => {
    return axios.get(baseURL + `/api/course`, getHeaders()
    )
  },
  getCourseById: (courseId) => {
    return axios.get(baseURL + `/api/course/${courseId}`, getHeaders()
    )
  },
  getCourseNameandAmount:(courseId) => {
    return axios.get(baseURL + `/api/course/basic-info/${courseId}`
    )
  }
}