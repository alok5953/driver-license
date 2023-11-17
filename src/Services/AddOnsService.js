import { getItemLocalStorage } from '../Utils/Util';
import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const AddOnsService = {
    getAddOnsList: (pageNo, size) => {
        return axios.get(baseURL + `/api/admin/addons/?page=${pageNo}&size=${size}`, 
            getHeaders())
    },
    saveAddOns: (addOnsDetail) => {
        return axios.post(baseURL + '/api/admin/addons', addOnsDetail,
            getHeaders()
        )
    },
    getAddOnsById: (id) => {
        return axios.get(baseURL + `/api/admin/addons/${id}`,
            getHeaders()
        )
    },
    updateAddOns: (id, updateAddOnsDetail) => {
        return axios.put(baseURL + `/api/admin/addons/${id}`, updateAddOnsDetail,
            getHeaders()
        )
    },
    deleteAddOns: (id) => {
        return axios.delete(baseURL + `/api/admin/addons/${id}`,
            getHeaders()
        )
    }
}