import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken =  localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const AuditLogsService = {
    getAllAuditLogsList: () => {
        return axios.get(baseURL + `/api/admin/audit-logs`, 
            getHeaders()
        )
    },
    auditLogsCSVExport: (user_id, course_id) => {
        return axios.get(baseURL + `/api/admin/audit-logs/csv-export?user_id=${user_id}&course_id=${course_id}`, 
            getHeaders()
        )
    },
    getAuditLogsUserAndCourseById: (user_id, course_id) => {
        return axios.get(baseURL + `/api/admin/audit-logs?user_id=${user_id}&course_id=${course_id}`, 
            getHeaders()
        )
    },

}
