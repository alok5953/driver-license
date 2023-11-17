import {
  H5P_PLAY_GET_SUCCESS, COURSE_MODULE_GET_SUCCESS, 
  COURSE_MODULE_QUIZ_GET_SUCCESS, COURSE_MODULE_SECURITY_GET_SUCCESS, QUIZ_MODULE_GET_SUCCESS
} from '../../Actions/ActionTypes/UserModuleType';


const iState = {
  courseModuleDetail: {},
  h5pComponent: {},
  securityModuleDetail:[],
  quizDetail:[],
  quizModuleDetail:[],
};

export const userModuleReducer = (state = iState, action) => {
  switch (action.type) {
    case COURSE_MODULE_GET_SUCCESS:
        
      return {
        ...state,
        courseModuleDetail: action.payload
      }
    case H5P_PLAY_GET_SUCCESS:
      return {
        ...state,
        h5pComponent: action.payload
      }
    case COURSE_MODULE_QUIZ_GET_SUCCESS:
      return {
        ...state,
        quizDetail: action.payload
      }
    case COURSE_MODULE_SECURITY_GET_SUCCESS:
      return {
        ...state,
        securityModuleDetail: action.payload
      }
    case QUIZ_MODULE_GET_SUCCESS:
      return {
        ...state,
        quizModuleDetail: action.payload
      }
    default:
      return state;
  }
};
