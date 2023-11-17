import {
    COURSE_DETAIL_SUCCESS, COURSE_GET_SUCCESS
  } from '../../Actions/ActionTypes/UserCourseTypes';
  
  
  const iState = {
    courseId: {},
    courseList: [],
  };
  
  export const userCourseReducer = (state = iState, action) => {
    switch (action.type) {
      case COURSE_GET_SUCCESS:
          
        return {
          ...state,
          courseList: action.payload
        }
      case COURSE_DETAIL_SUCCESS:
        return {
          ...state,
          courseId: action.payload
        }

      default:
        return state;
    }
  };
  
  