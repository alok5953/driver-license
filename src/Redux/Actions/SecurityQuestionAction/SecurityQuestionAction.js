import { loadingAction } from "./../LoadingAction";
import { SecurityQuestionService } from '../../../Services';
import { SECURITY_QUESTION_DETAIL_LIST_SUCCESS, SECURITY_QUESTION_GETBYID_SUCCESS,SECURITY_QUESTION_DELETE_SUCCESS,
    SECURITY_QUESTION_ADD_SUCCESS, SECURITY_QUESTION_UPDATE_SUCCESS, SECURITY_QUESTION_STATUS_UPDATE_SUCCESS, SECURITY_QUESTION_LIST_SUCCESS } from '../ActionTypes/SecurityQuestionTypes';


    // get security question detail list
export const getSecurityQuestionDetailAction = (pageNo,size) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.getSecurityQuestionList(pageNo,size)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_DETAIL_LIST_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};

// save security question
export const addSecurityQuestionAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.addSecurityQuestion(data)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_ADD_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};

// get security detail by id
export const getSecurityQuestionByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.getSecurityQuestionById(id)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_GETBYID_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};

// delete security question
export const deleteSecurityQuestionAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.deleteSecurityQuestion(id)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_DELETE_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};

// update security question
export const updateSecurityQuestionAction = (id,data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.updateSecurityQuestion(id,data)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_UPDATE_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};

export const updateSecurityQuestionStatusAction = (id,data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return SecurityQuestionService.updateSecurityQuestionStatus(id,data)
        .then(response => {
            dispatch(loadingAction(false));
            return dispatch({ type: SECURITY_QUESTION_STATUS_UPDATE_SUCCESS, payload: response });
        })
        .catch(err => {
            dispatch(loadingAction(false));
            throw err;
        });
    };
};
