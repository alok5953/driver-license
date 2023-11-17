import { getItemLocalStorage } from '../Utils/Util';
import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const SettingService = {
    getUserDetailByToken: () => {
        return axios.get(baseURL + '/api/admin/user', getHeaders())
    },
    addRole: (addRoleDetailDetail) => {
        return axios.post(baseURL + '/api/admin/roles', addRoleDetailDetail,
            getHeaders()
        )
    },
    getAllRoleList: () => {
        return axios.get(baseURL + '/api/admin/roles', getHeaders()) 
    },
    saveAdmin: () => {
        return axios.get(baseURL + '/api/admin/roles', getHeaders())
    },
    getAllPolicies: () => {
        return axios.get(baseURL + '/api/admin/roles/policies', getHeaders())
    },
    deleteRolePermission: (id) => {
        return axios.delete(baseURL + `/api/admin/roles/${id}`, getHeaders())
    },
    resetRolePermission: (id) => {
        return axios.patch(baseURL + `/api/admin/roles/restore/${id}`,{}, getHeaders())
    },
    getAllAdminList: () => {
        return axios.get(baseURL + '/api/admin/users', getHeaders())
    },
    deleteAdminById: (id) => {
        return axios.delete(baseURL + `/api/admin/users/${id}`, getHeaders())
    },
    getAdminDetailById: () => {
        return axios.delete(baseURL + '/api/admin/user', getHeaders())
    },
    getRoleDetailById: (id) => {
        return axios.get(baseURL + `/api/admin/roles/${id}`, getHeaders())
    },
    updateRole: (roleId, updateRoleDetail) => {
        return axios.put(baseURL + `/api/admin/roles/${roleId}`, updateRoleDetail,
            getHeaders()
        )
    },
    updateAdminSection: (adminId, updateAdminDetail) => {
        return axios.put(baseURL + `/api/admin/users/${adminId}`, updateAdminDetail,
            getHeaders()
        )
    },
    getAllRoleListForAdminUserSection: () => {
        return axios.post(baseURL + '/api/admin/roles/roleList',{} ,getHeaders()) 
    },
    resetAdminUserById: (id) => {
        return axios.patch(baseURL + `/api/admin/users/retrieve/${id}`,{}, getHeaders())
    },
    resendVerificationMailAdminUserById: (id) => {
        return axios.post(baseURL + `/api/admin/users/resend-verification-email`,id, getHeaders())
    }
} 
