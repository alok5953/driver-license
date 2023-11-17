import {
    QUIZ_DETAIL_LIST_SUCCESS, QUIZ_GETBYID_SUCCESS, QUIZ_DELETE_SUCCESS,
    QUIZ_ADD_SUCCESS, QUIZ_UPDATE_SUCCESS, QUIZ_STATUS_UPDATE_SUCCESS,QUIZ_CONTAIN_DETAIL
} from '../../Actions/ActionTypes/QuizeTypes';

const iState = {
    quizeDetailList: {},
    updateQuizeSuccessResult: {},
    addQuizeSuccessResult: {},
    deleteQuizeResult: {},
    updateQuizeStatusResult: {},
    getQuizeByIdSuccuessResult: {},
    quizeContentDetail:{}
};

export const quizeReducer = (state = iState, action) => {
    switch (action.type) {
        case QUIZ_DETAIL_LIST_SUCCESS:
            return {
                ...state,
                quizeDetailList: action.payload
            }
        case QUIZ_UPDATE_SUCCESS:
            return {
                ...state,
                updateQuizeSuccessResult: action.payload
            }
        case QUIZ_ADD_SUCCESS:
            return {
                ...state,
                addQuizeSuccessResult: action.payload
            }
        case QUIZ_GETBYID_SUCCESS:
            return {
                ...state,
                getQuizeByIdSuccuessResult: action.payload
            }

        case QUIZ_DELETE_SUCCESS:
            return {
                ...state,
                deleteQuizeResult: action.payload
            }
        case QUIZ_CONTAIN_DETAIL:
            return {
                ...state,
                quizeContentDetail:action.payload
            }

        default:
            return state;
    }
};