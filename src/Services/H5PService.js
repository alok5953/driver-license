import axios from 'axios';
import { get } from 'react-hook-form';
import { baseURL } from './index';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}


export const H5PService =  {

    getPlay: (id) => {
        return axios.get(baseURL+`/h5p/${id}/play`),  getHeaders()
    }
}