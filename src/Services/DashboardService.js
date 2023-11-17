import axios from 'axios';
import { baseURL } from './index';

const getHeaders = () => {
    const accessToken =  localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };
}


export const DashboardService = {

    getRegisteredUser: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/getRegisteredUser?cid=${cid}&year=${year}`, getHeaders())
    },
    getCompletedCources: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/getCompletedCourses?cid=${cid}&year=${year}`, getHeaders())
    },
    getEnrolledCources: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/getEnrolledCourses?cid=${cid}&year=${year}`, getHeaders())
    },
    getTotalCoursePayment: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/totalCoursePayment?cid=${cid}&year=${year}`, getHeaders())
    },
    getUsersWithNoPayments: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/usersWithNoPayments?cid=${cid}&year=${year}`, getHeaders())
    },
    getCoursePerformance: (cid,year) => {
        return axios.get(baseURL + `/api/admin/dashboard/getCoursePerformance?cid=${cid}&year=${year}`, getHeaders())
    }
} 