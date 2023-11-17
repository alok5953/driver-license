import axios from 'axios';
import { baseURL } from './BaseApi';

const getHeaders = () => {
    const accessToken = sessionStorage.getItem('userAccessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}
const getGrapesjsHeader = (module_id) => {
    const accessToken = sessionStorage.getItem('userAccessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json', module_id: module_id } };
}

export const UserModuleService = {
    getModuleById: (id) => {
        return axios.get(baseURL + `/api/course/module/grapejs`, getGrapesjsHeader(id)
        )
    },
    getH5P: (contentId) => {
        return axios.get(baseURL + `/h5p/${contentId}/play`,
            getHeaders()
        )
    },

    getSecurityModuleById: (id) => {
        return axios.get(baseURL + `/api/course/module/${id}`, getHeaders()

        )
    },
    getQuizModuleById: (id) => {
        return axios.get(baseURL + `/api/course/module/${id}`, getHeaders()

        ) 
    },
    getQuizById: (id) => {
        return axios.get(baseURL + `/api/admin/quizzes/${id}`, getHeaders()

        ) 
    },
}