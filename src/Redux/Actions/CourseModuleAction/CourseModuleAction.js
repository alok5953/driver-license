import { loadingAction } from "./../LoadingAction";
import { CourseModuleService } from '../../../Services/CourseModuleService';
import {
    COURSE_MODULE_ADD_SUCCESS, COURSE_MODULE_CONTAIN_ID, COURSE_MODULE_DELETE_SUCCESS,
    COURSE_MODULE_LIST_SUCCESS, COURSE_MODULE_LIST_ALL_SUCCESS, COURSE_MODULE_GETBYID_SUCCESS,
    COURSE_MODULE_UPDATE_SUCCESS, SECURITY_QUESTION_LIST_SUCCESS, QUIZ_QUESTION_LIST_SUCCESS
    , COURSE_MODULE_SECURITY_QUESTION_SUCCESS, COURSE_MODULE_SECURITY_QUESTION_DETAIL_SUCCESS, 
    COURSE_MODULE_SECURITY_QUESTION_UPDATE_SUCCESS, COURSE_MODULE_QUIZ_DETAIL_ID, 
    COURSE_MODULE_SECURITY_ID, COURSE_MODULE_AUDIO_UPLOAD, COURSE_MODULE_AUDIO_UPDATE,
    COURSE_MODULE_TYPING_DNA_DETAIL_SUCCESS, COURSE_MODULE_REORDER_UPDATE_SUCCESS, 
    COURSE_MODULE_DOCS_UPDATE, COURSE_MODULE_DOCS_UPLOAD, COURSE_MODULE_DOCS_DELETE
} from '../ActionTypes/CourseModuleTypes';


// get Course Module List 
export const getCourseModuleListAllAction = (id,page,size) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.getCourseModuleListAll(id,page,size)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_LIST_ALL_SUCCESS, payload: response })
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}


// get Course Module Detial by Id 
export const getCourseModuleByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.getCourseModuleById(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_GETBYID_SUCCESS, payload: response })
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

// save Course Module 
export const addCoureModuleAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.addCourseModuleDetail(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_ADD_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });

    }
}


//  delete Course Module Page 
export const deleteCourseModuleAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.deleteCourseModule(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_DELETE_SUCCESS, payload: response });

            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}


// update Course Module 
export const updateCourseModuleAction = (id, data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.updateCourseModuleDetail(id, data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_UPDATE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }

}

// get Course Module Detail list 
export const courseModuleListAction = (courseModuleList) => {
    return (dispatch) => {
        const data = {
            data: courseModuleList
        } 
        return dispatch({ type: COURSE_MODULE_LIST_SUCCESS, payload: data })
    }
}


export const courseModuleDetailAction = (id) => {
    return (dispatch) => {
        const data = {
            data: {
                code: 200,
                id: id,
            }
        }
        return dispatch({ type: COURSE_MODULE_CONTAIN_ID, payload: data })
    }
}

export const quizDetailIdAction = (id) => {

    return (dispatch) => {
        const data = {
            data: {
                code: 200,
                id: id,
            }
        }
        return dispatch({ type: COURSE_MODULE_QUIZ_DETAIL_ID, payload: data })
    }
}

export const securityDetailAction = (id) => {
    return (dispatch) => {
        const data = {
            data: {
                code: 200,
                id: id,
            }
        }
        return dispatch({ type: COURSE_MODULE_SECURITY_ID, payload: data })
    }
}

// get security question 
export const getSecurityQuestionListAction = () => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.getScurityQuestionList()
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: SECURITY_QUESTION_LIST_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// get quiz questions
export const getQuizQuestionListAction = () => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.getQuizQuestionList()
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: QUIZ_QUESTION_LIST_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

export const saveSecurityQuestionCourseModuleAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.saveCourseModuleSecurityQuestionSave(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_SECURITY_QUESTION_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });

    }
}

export const updateCourseModuleSecurityQuestionAction = (id, data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.updateCourseModuleSecurityQuestion(id, data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_SECURITY_QUESTION_UPDATE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}


export const uploadCourseModuleAudioAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.uploadCourseModuleAudio( data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_AUDIO_UPLOAD, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}



export const saveCourseModuleTypingDnaAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.saveCourseModuleTypingDna(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_TYPING_DNA_DETAIL_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const updateCourseModuleAudioAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.updateCourseModuleAudio( data )
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_AUDIO_UPDATE, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const courseModuleReorderAction = ( sourceId,destId ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.courseModuleListReorder( sourceId,destId )
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_REORDER_UPDATE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const uploadCourseModuleDocsAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.updateCourseModuleDocuments(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_DOCS_UPLOAD, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const deleteCourseModuleDocsAction = ( id ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseModuleService.deleteCourseModuleDocuments(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_MODULE_DOCS_DELETE, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}