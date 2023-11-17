import axios from 'axios';
import { get } from 'react-hook-form';
import { baseURL } from './index';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
}

const getGrapesjsHeader = (module_id) => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json', module_id: module_id }, 'Access-Control-Allow-Origin':'*' };
}

export const GrapesjsService = {

    addGrapesjs: (addGrapesjsDetail) => {
        return axios.post(baseURL +`/api/course/module/grapejs`, addGrapesjsDetail,  
            getHeaders()
        )
    },

    getGrapesjsById: (module_id) => {
        return axios.get(baseURL +`/api/course/module/grapejs`,
        getGrapesjsHeader(module_id)
        )
    },

    updateGrapesjs: (updateGrapesjsDetail) => {
        return axios.get(baseURL +`/api/course/module/grapejs`, updateGrapesjsDetail,
            getHeaders()
        )
    },

    updateGrapesjsMetadata: (updateGrapesjsMetadata) => {
        return axios.get(baseURL +`/api/course/module/grapejs`, updateGrapesjsMetadata,
            getHeaders()
        )
    },

    uploadGrapesjsAssets: (uploadAssetsDetail) => {
        return axios.get(baseURL +`/api/course/module/grapejs/upload`, uploadAssetsDetail,
            getHeaders()
        )
    },

    getGrapesjsAssets: () => {
        return axios.get(baseURL +`/api/course/module/grapejs/upload`,
            getHeaders()
        )
    },
    getH5PContent: () => {
        return axios.get(baseURL+`/h5p`, getHeaders()
        )
    }
}