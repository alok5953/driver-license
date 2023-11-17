import { loadingAction } from "../LoadingAction";
import { QuizService } from '../../../Services';
import {
    QUIZ_DETAIL_LIST_SUCCESS, QUIZ_GETBYID_SUCCESS, QUIZ_DELETE_SUCCESS,
    QUIZ_ADD_SUCCESS, QUIZ_UPDATE_SUCCESS,QUIZ_CONTAIN_DETAIL, CLEAR_QUIZE_REDUCER
} from '../ActionTypes/QuizeTypes';


// get Quize detail list
export const getQuizDetailAction = (pageNo, size, quiz_name) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return QuizService.getQuizList(pageNo, size, quiz_name)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_DETAIL_LIST_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// save quize
export const addQuizAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return QuizService.addQuiz(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_ADD_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// get quize detail by id
export const getQuizByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return QuizService.getQuizById(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_GETBYID_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// delete quize question
export const deleteQuizeAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return QuizService.deleteQuiz(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_DELETE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// update quize
export const updateQuizAction = (id, data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return QuizService.updateQuiz(id, data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_UPDATE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// SAVE quiz contain
export const quizDetailAction = (data) =>{
    return (dispatch)=>{
        return dispatch({ type: QUIZ_CONTAIN_DETAIL, payload: data });
        
    }
}

export const clearQuizReducerAction = () =>{
    return (dispatch) => {
        dispatch({type: QUIZ_CONTAIN_DETAIL, payload: {}});
        dispatch({type: QUIZ_DETAIL_LIST_SUCCESS, payload: {}})
        dispatch({type: QUIZ_GETBYID_SUCCESS, payload: {}})
        dispatch({type: QUIZ_DELETE_SUCCESS, payload: {}});
        dispatch({type: QUIZ_ADD_SUCCESS, payload: {}});
        dispatch({type: QUIZ_UPDATE_SUCCESS, payload: {}});
        const data = {
            data: {
                code:200
            }
        }
        return dispatch({type: CLEAR_QUIZE_REDUCER,payload: data})
    }
}