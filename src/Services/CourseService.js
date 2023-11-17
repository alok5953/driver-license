import axios from 'axios';
import { baseURL } from './index';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
} 

const getFileUploadHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'multipart/form-data'} };

}

export const CourseService = {
    getCourseListAll: (pageNo, size) => {
        return axios.get(baseURL +`/api/course/?page=${pageNo}&size=${size}`,
            getHeaders()
        ) 
    },
    addCourseDetail: (addCourseDetail) => {
      
        return axios.post(baseURL +`/api/course`, addCourseDetail, 
        getFileUploadHeaders()
        )
    },
    getCourseById: (id) => {
        
        return axios.get(baseURL +`/api/course/${id}`,
            getHeaders()
        )
    },
    updateCourseDetail: (id, updateCoursePageDetail) => {
        return axios.put(baseURL +`/api/course/${id}`, updateCoursePageDetail, 
        getFileUploadHeaders()
        
        )
    },

    deleteCourse: (id) => {
        return axios.put(baseURL + `/api/course/${id}`,{"is_deleted": true},
            getHeaders()
        )
    },
    uploadCourseVideo: (formData) => {
        return axios.post(baseURL +`/api/course/---------`,formData, getFileUploadHeaders())
    },
    saveCustomField: (customDetail) =>{
       
        return axios.post(baseURL + '/api/course/custom-field', customDetail,
        getHeaders()
    )
    },
    updateCustomField: (customDetail) =>{
        return axios.patch(baseURL +`/api/course/custom-field`,customDetail, getHeaders())
    }
}