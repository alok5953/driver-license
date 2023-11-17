import { loadingAction } from "../LoadingAction";
import { StripeService } from '../../../Services/StripeService'
import {
    CREATE_CHECKOUT_SUCCESS, RECEIPT_SUCCESS, USER_PAYMENT_STATUS_CHECK_SUCCESS
} from '../ActionTypes/StripeTypes'

export const createCheckoutSessionAction = (min,max) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return StripeService.createCheckoutSession(min,max)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: CREATE_CHECKOUT_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const getReceiptAction = (courseId) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return StripeService.getReceipt(courseId)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: RECEIPT_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const userPaymentStatusCheckAction = (courseId) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return StripeService.userPaymentStatusCheck(courseId)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_PAYMENT_STATUS_CHECK_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};