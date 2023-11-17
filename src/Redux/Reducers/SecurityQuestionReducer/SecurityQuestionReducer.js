import {
    SECURITY_QUESTION_DETAIL_LIST_SUCCESS,SECURITY_QUESTION_LIST_SUCCESS, SECURITY_QUESTION_GETBYID_SUCCESS, SECURITY_QUESTION_DELETE_SUCCESS,
    SECURITY_QUESTION_ADD_SUCCESS, SECURITY_QUESTION_UPDATE_SUCCESS, SECURITY_QUESTION_STATUS_UPDATE_SUCCESS
} from '../../Actions/ActionTypes/SecurityQuestionTypes';


const iState = {
    
    securityQuestionDetailList: {},
    updateSecurityQuestionSuccessResult: {},
    addSecurityQuestionSuccessResult: {},
    deleteSecurityQuestionResult: {},
    updateSecurityQuestionStatusResult: {},
    getSecurityQuestionByIdSuccuessResult: {}
};


export const securityQuestionReducer = (state = iState, action) => {

    switch (action.type) {

        case SECURITY_QUESTION_DETAIL_LIST_SUCCESS:
            return {
                ...state,
                securityQuestionDetailList: action.payload
            }
        case SECURITY_QUESTION_UPDATE_SUCCESS:
            return {
                ...state,
                updateSecurityQuestionSuccessResult: action.payload
            }
        case SECURITY_QUESTION_ADD_SUCCESS:
            return {
                ...state,
                addSecurityQuestionSuccessResult: action.payload
            }
        case SECURITY_QUESTION_GETBYID_SUCCESS:
            return {
                ...state,
                getSecurityQuestionByIdSuccuessResult: action.payload
            }

        case SECURITY_QUESTION_DELETE_SUCCESS:
            return {
                ...state,
                deleteSecurityQuestionResult: action.payload
            }
        case SECURITY_QUESTION_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                updateSecurityQuestionStatusResult: action.payload
            }

        default:
            return state;
    }
};