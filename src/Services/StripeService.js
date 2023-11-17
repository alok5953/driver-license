import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = sessionStorage.getItem('userAccessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const StripeService = {
   
    createCheckoutSession: (detail) => {
        return axios.post(baseURL + '/api/course/create-checkout-session', detail,
            getHeaders()
        )
    },
    getReceipt: (courseId) => {
        return axios.get(baseURL + `/api/course/receipt?course_id=${courseId}`, 
            getHeaders()
        )
    },
    userPaymentStatusCheck: (courseId) => {
        return axios.get(baseURL + `/api/course/is-paid?course_id=${courseId}`, 
            getHeaders()
        )
    }
}