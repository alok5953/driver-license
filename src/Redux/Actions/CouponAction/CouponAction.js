import { loadingAction } from "../LoadingAction";
import { CouponService } from '../../../Services';
import {
    COUPON_LIST_SUCCESS, COUPON_ADD_SUCCESS, COUPON_UPDATE_SUCCESS, COUPON_GETBYID_SUCCESS, COUPON_DELETE_SUCCESS,PROMOCODE_LIST_SUCCESS
} from '../ActionTypes/CouponTypes'

 

// save coupon
export const saveCouponAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CouponService.saveCoupon(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COUPON_ADD_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// get promocode detail list
export const getPromocodeDetailAction = (size,promocodeId) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CouponService.getPromocodeList(size,promocodeId)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: PROMOCODE_LIST_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};


