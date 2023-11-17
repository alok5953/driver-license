import { loadingAction } from "../LoadingAction";
import { AuditLogsService } from '../../../Services/AuditlogsService'
import {
    GET_ALL_AUDIT_LOGS_DETAIL_SUCCESS, GET_AUDIT_LOGS_CSV_SUCCESS, GET_AUDIT_LOGS_DETAIL_BY_COURSE_AND_USER_SUCCESS
} from '../ActionTypes/AuditLogsTypes'

export const getAllAuditLogsListAction = (min, max) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AuditLogsService.getAllAuditLogsList(min, max)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_ALL_AUDIT_LOGS_DETAIL_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const auditLogsCSVDownloadAction = (userId, courseId) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AuditLogsService.auditLogsCSVExport(userId, courseId)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_AUDIT_LOGS_CSV_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const getAuditLogsUserAndCourseByIdAction = (min, max) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AuditLogsService.getAuditLogsUserAndCourseById(min, max)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: GET_AUDIT_LOGS_DETAIL_BY_COURSE_AND_USER_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};