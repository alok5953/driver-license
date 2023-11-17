import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = sessionStorage.getItem('userAccessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const ReferenceService = {
    sendInvitationByEmail: (email) => {
        return axios.post(baseURL + '/api/course/create-checkout-session', email,
            getHeaders()
        )
    },
    getReferenceUrl: () => {
        return axios.get(baseURL + `/api/user/userReferral`, 
            getHeaders()
        )
    }
}