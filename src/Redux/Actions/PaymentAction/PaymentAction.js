import { loadingAction } from "../LoadingAction";
import { PaymentService } from '../../../Services/PaymentService'
import {
    PAYMENT_DETAIL_SUCCESS
} from '../ActionTypes/PaymentTypes'

export const getPaymentDetailListAction = (pageNo, size,course_id,search,from,to) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return PaymentService.getPaymentDetailList(pageNo, size,course_id,search,from,to)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: PAYMENT_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};