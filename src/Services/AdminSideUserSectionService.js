import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken =  localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

} 

export const AdminSideUserSectionService = {
    getUserDetailList: (pageNo, size,course_id,search,from,to) => {
        let key='',url=''
        if(!course_id && !search && !from && !to ){
            url =  `/api/admin/users/customers/?page=${pageNo}&size=${size}`
        } else{
            if(course_id){
                key+=`&course_id=${course_id}`
            }
            if(search){
                key+=`&search=${search}`
            }
            if(from){
                key+=`&from=${from}`
            }
            if(to){
                key+=`&to=${to}`
            }
            url =  `/api/admin/users/customers/?page=${pageNo}&size=${size}${key}`
            
        }
        return axios.get(baseURL + `${url}`, 
            getHeaders()
        )
    },
    updateExpiryDate: (id, data) => {
        let url =  `/api/admin/users/extendedcourseexpiry/${id}`
        return axios.put(baseURL+`${url}`, data,
            getHeaders()
        )
    }
}

