import { loadingAction } from "../LoadingAction";
import { DashboardService } from '../../../Services/';
import {
    GET_ENROLLED_COURSES_SUCCESS, GET_COMPLETED_COURSES_SUCCESS, GET_REGISTERED_USER_SUCCESS, GET_TOTAL_COURSES_PAYMENT_SUCCESS,GET_USERS_WITH_NO_PAYMENT_SUCCESS,GET_COURSE_PERFORMANCE_SUCCESS
} from '../ActionTypes/DashboardTypes'


// get registered user detail 
export const getRegisteredUserAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getRegisteredUser(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_REGISTERED_USER_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getCompletedCourcesAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getCompletedCources(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_COMPLETED_COURSES_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getEnrolledCourcesAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getEnrolledCources(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_ENROLLED_COURSES_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getTotalCoursePaymentAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getTotalCoursePayment(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_TOTAL_COURSES_PAYMENT_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getUsersWithNoPaymentsAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getUsersWithNoPayments(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_USERS_WITH_NO_PAYMENT_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getCoursePerformanceAction = (cid,year) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return DashboardService.getCoursePerformance(cid,year)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_COURSE_PERFORMANCE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};