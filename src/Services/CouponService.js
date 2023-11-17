import { baseURL } from './index';
import axios from 'axios';

const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken')
    return { headers: { "authorization": `Bearer ${accessToken}`, Accept: 'application/json' } };

}

export const CouponService = {
    saveCoupon: (couponDetail) => {
        return axios.post(baseURL + '/api/admin/promotion-code', couponDetail,
            getHeaders()
        )
    },
    getPromocodeList: (size,promocodeId) => {
        let url = ''
            if(promocodeId){
                url=   `/api/admin/promotion-code?limit=${10}&starting_after=${promocodeId}`
            } else{
                url=   `/api/admin/promotion-code?limit=${10}`
            }
            return axios.get(baseURL + url, 
            getHeaders())
    }
}