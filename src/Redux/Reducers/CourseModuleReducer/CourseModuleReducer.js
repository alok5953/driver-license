import { CourseModuleService } from '../../../Services/CourseModuleService';
import {
    COURSE_MODULE_GETBYID_SUCCESS, COURSE_MODULE_ADD_SUCCESS, COURSE_MODULE_CONTAIN_ID, SECURITY_QUESTION_LIST_SUCCESS, QUIZ_QUESTION_LIST_SUCCESS,
    COURSE_MODULE_DELETE_SUCCESS, COURSE_MODULE_LIST_SUCCESS, COURSE_MODULE_UPDATE_SUCCESS, COURSE_MODULE_LIST_ALL_SUCCESS, 
    COURSE_MODULE_GRAPESJS_ADD_SUCCESS, COURSE_MODULE_SECURITY_ID, 
    COURSE_MODULE_QUIZ_DETAIL_ID,  COURSE_MODULE_AUDIO_UPLOAD, 
    COURSE_MODULE_AUDIO_UPDATE, COURSE_MODULE_DOCS_UPDATE, 
    COURSE_MODULE_DOCS_UPLOAD, COURSE_MODULE_DOCS_DELETE
} from '../../Actions/ActionTypes/CourseModuleTypes';

const iState = {
    courseModuleListAll:[],
    addCourseModuleSuccessResult: {},
    updateCourseModuleSuccessResult: {},
    deleteCourseModuleResult: {},
    getCourseModuleByIdSuccessResult: [],
    courseModuleContentId:'',
    courseModuleList: [],
    securityQuestionList: [],
    quizQuestionList: [],
    securityContentId:{},
    quizDetailContentId:{},
    audioUploadResponse:{},
    audioUpdateResponse:{},
    documentsUploadResponse: {},
    documentsDeleteResponse: {},

}

export const courseModuleReducer = (state = iState, action) => {
    
    switch(action.type) {

        case COURSE_MODULE_LIST_ALL_SUCCESS:
            return {
                ...state,
                courseModuleDetailList: action.payload
            }
        case COURSE_MODULE_ADD_SUCCESS:
            return {
                ...state,
                addCourseModuleSuccessResult: action.payload
            }
        case COURSE_MODULE_UPDATE_SUCCESS:
            return {
                ...state,
                updateCourseModuleSuccessResult: action.payload
            }
        case COURSE_MODULE_DELETE_SUCCESS:
            return {
                ...state,
                deleteCourseModuleResult: action.payload
            }
        case COURSE_MODULE_GETBYID_SUCCESS:
            return {
                ...state,
                getCourseModuleByIdSuccessResult: action.payload
            }
        case COURSE_MODULE_CONTAIN_ID:
            return {
                ...state,
                courseModuleContentId: action.payload
            }
        case COURSE_MODULE_QUIZ_DETAIL_ID:
            return {
                ...state,
                quizDetailContentId: action.payload
            }
        case COURSE_MODULE_SECURITY_ID:
            return {
                ...state,
                securityContentId: action.payload
            }
        case COURSE_MODULE_LIST_SUCCESS:
            return {
                ...state,
                courseModuleList: action.payload
            }
        case SECURITY_QUESTION_LIST_SUCCESS:
            return {
                ...state,
                securityQuestionList: action.payload
            }
        case QUIZ_QUESTION_LIST_SUCCESS:
            return {
                ...state,
                quizQuestionList: action.payload
            }
        case COURSE_MODULE_AUDIO_UPLOAD:
            return {
                ...state,
                audioUploadResponse: action.payload
            }
        case COURSE_MODULE_AUDIO_UPDATE:
            return {
                ...state,
                audioUpdateResponse: action.payload
            }
        case COURSE_MODULE_DOCS_UPLOAD:
            return {
                ...state,
                documentsUploadResponse: action.payload
            }
        case COURSE_MODULE_DOCS_DELETE:
            return {
                ...state,
                documentsDeleteResponse: action.payload
            }
        default:
            return state;
    }
}