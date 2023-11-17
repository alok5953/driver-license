import axios from 'axios';
import { get } from 'react-hook-form';
import { baseURL } from './index';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}
const getFileUploadHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'multipart/form-data'} };

}

export const CourseModuleService = {
    getCourseModuleListAll: (id,page,size) => {
        return axios.get(baseURL + `/api/course/module?course_id=${id}&page=${page}&size=${size}`,
            getHeaders()
        )
    },
    addCourseModuleGrapesjs: (addGrapesjsModuleDetail) => {
        return axios.post(baseURL + `/api/course/module/grapejs`, addGrapesjsModuleDetail,
            getHeaders()
        )
    },
    addCourseModuleDetail: (addCourseModuleDetail) => {

        return axios.post(baseURL + `/api/course/module`, addCourseModuleDetail,
            getHeaders()
        )
    },
    getCourseModuleById: (id) => {
        return axios.get(baseURL + `/api/course/module/${id}`,
            getHeaders()
        )
    },
    getCourseModuleGrapesjsById: (id) => {
        return axios.get(baseURL + `/api/course/module/grapejs/${id}`,
            getHeaders()
        )
    },
    updateCourseModuleDetail: (id, updateCourseModulePageDetail) => {
        return axios.put(baseURL + `/api/course/module/${id}`, updateCourseModulePageDetail,
            getHeaders()
        )
    },

    deleteCourseModule: (id) => {
        return axios.delete(baseURL + `/api/course/module/${id}`,
            getHeaders()
        ) 
    },

    // Scurity : spelling incorrect in purpose 
    getScurityQuestionList: () => {
        return axios.get(baseURL + `/api/admin/security-questions/getScurityQuestionList`, getHeaders())
    },
    getQuizQuestionList: () => {
        return axios.get(baseURL + `/api/admin/quizzes/getQuizList`, getHeaders())
    },
    saveCourseModuleSecurityQuestionSave: (security_question_list) => {
        return axios.post(baseURL + `/api/course/module/security-questions`, security_question_list,
            getHeaders()
        )
    },

    updateCourseModuleSecurityQuestion: (id, data) => {
        return axios.put(baseURL + `/api/course/module/security-questions/${id}`, data, getHeaders())
    },
    saveCourseModuleTypingDna: (typing_dna_list) => {
        return axios.post(baseURL + `/api/course/module/typing-dna`, typing_dna_list,
            getHeaders()
        )
    },
    
    updateCourseModuleSecurityQuestion:(id, data) =>{
        return axios.put(baseURL +`/api/course/module/security-questions/${id}`,data, getHeaders())
    }, 
    courseModuleListReorder:(sourceId,destId) =>{
        return axios.patch(baseURL +`api/course/module/reorder?source=${sourceId}&destination=${destId}`,{}, getHeaders())
    },
    
    
    uploadCourseModuleAudio: (id, data)=> {
        return axios.post(baseURL +`/api/course/module/${id}`,data, getHeaders())
    },
    updateCourseModuleAudio: ( formData)=> {

        return axios.post(baseURL +`/api/course/module/grapejs`,formData, getFileUploadHeaders())
    },
    updateCourseModuleDocuments: (formData)=> {

        return axios.post(baseURL +`/api/course/module/upload-document`,formData, getFileUploadHeaders())
    },
    deleteCourseModuleDocuments: (id)=> {

        return axios.delete(baseURL +`/api/course/module/upload-document/${id}`, getHeaders())
    },
}