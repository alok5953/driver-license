import { CourseService } from '../../../Services/CourseService';
import {
    COURSE_GETBYID_SUCCESS, COURSE_ADD_SUCCESS, COURSE_CONTAIN_ID, COURSE_UPLOAD_VIDEO_SUCCESS,
    COURSE_DELETE_SUCCESS, COURSE_UPDATE_SUCCESS, COURSE_LIST_ALL_SUCCESS,COURSE_ID_MULTIPLE_USES
} from '../../Actions/ActionTypes/CourseTypes';

const iState = {
    courseListAll:[],
    courseDetailList: [],
    addCourseSuccessResult: {},
    updateCourseSuccessResult: {},
    deleteCourseResult: {},
    getCourseByIdSuccessResult: [],
    courseId:'',
    courseVideoUploadSuccessResult:{},
}

export const courseReducer = (state = iState, action) => {
    switch(action.type) {

        case COURSE_LIST_ALL_SUCCESS:
            return {
                ...state,
                courseDetailList: action.payload
            }
        case COURSE_ADD_SUCCESS:
            return {
                ...state,
                addCourseSuccessResult: action.payload
            }
        case COURSE_UPDATE_SUCCESS:
            return {
                ...state,
                updateCourseSuccessResult: action.payload
            }
        case COURSE_DELETE_SUCCESS:
            return {
                ...state,
                deleteCourseResult: action.payload
            }
        case COURSE_GETBYID_SUCCESS:
            return {
                ...state,
                getCourseByIdSuccessResult: action.payload
            }
        case COURSE_CONTAIN_ID:
            return {
                ...state,
                courseId: action.payload
            }
        case COURSE_UPLOAD_VIDEO_SUCCESS:
            return     {
                ...state,
                courseVideoUploadSuccessResult: action.payload
            }
        default:
            return state;
    }
}