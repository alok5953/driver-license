import { loadingAction } from "./../LoadingAction";
import {CourseService} from '../../../Services/CourseService';
import {
    COURSE_ADD_SUCCESS, COURSE_CONTAIN_ID, COURSE_DELETE_SUCCESS, 
    COURSE_DETAIL_LIST_SUCCESS, COURSE_GETBYID_SUCCESS, COURSE_LIST_ALL_SUCCESS, CLEAR_COURSE_REDUCER, 
    COURSE_UPDATE_SUCCESS,COURSE_ID_MULTIPLE_USES, COURSE_UPLOAD_VIDEO_SUCCESS, CUSTOM_FIELD_SAVE_SUCCESS,CUSTOM_FIELD_UPDATE_SUCCESS
} from '../ActionTypes/CourseTypes';


// get Course List 
export const getCourseListAllAction = (pageNo, perPage) => {
    return (dispatch) =>{
        dispatch(loadingAction(true));
        return CourseService.getCourseListAll(pageNo, perPage)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: COURSE_LIST_ALL_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err ;
            })
    }
}


// get Course Detial by Id 
export const getCourseByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseService.getCourseById(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: COURSE_GETBYID_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

// save Course 
export const addCourseAction = (data) => {
    return(dispatch) => {
        if(data){
            dispatch(loadingAction(true));
            return CourseService.addCourseDetail(data)
                .then(response => {
                    dispatch(loadingAction(false));
                    return dispatch({type: COURSE_ADD_SUCCESS, payload: response});
                })
                .catch(err => {
                    dispatch(loadingAction(false));
                    throw err;
                });
        } else{
            return dispatch({type: COURSE_ADD_SUCCESS, payload: {}});
        }

    }
}


//  delete Course Page 
export const deleteCourseAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseService.deleteCourse(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: COURSE_DELETE_SUCCESS, payload: response});

            })
            .catch(err=> {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}


// update Course 
export const updateCourseAction = (id, data) => {
    return (dispatch) => {
        if(data){
        dispatch(loadingAction(true));
        return CourseService.updateCourseDetail(id, data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: COURSE_UPDATE_SUCCESS, payload: response});
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
        } else{
            return dispatch({type: COURSE_UPDATE_SUCCESS, payload: {}});
        }
    }

}


export const courseDetailAction = (id) => {
    return (dispatch) => {
        const data = {
            data: {
                code:200,
                id: id,
            }
        }
        return dispatch({type: COURSE_CONTAIN_ID, payload: data})
    }
}
 
export const clearCourseReducerAction = () =>{
    return (dispatch) => {
        const data = {
            data: {
                code:200
            }
        }
        dispatch({type: COURSE_CONTAIN_ID, payload: {}})
        dispatch({type: COURSE_GETBYID_SUCCESS, payload: {}})
        dispatch({type: COURSE_DELETE_SUCCESS, payload: {}});
        dispatch({type: COURSE_UPDATE_SUCCESS, payload: {}});
        return dispatch({type: CLEAR_COURSE_REDUCER,payload: data})
    }
}


export const uploadCourseVideoAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseService.uploadCourseVideo(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: COURSE_UPLOAD_VIDEO_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const saveCustomFieldAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseService.saveCustomField(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: CUSTOM_FIELD_SAVE_SUCCESS,payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const updateCustomFieldAction = ( data ) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return CourseService.updateCustomField(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: CUSTOM_FIELD_UPDATE_SUCCESS,payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}