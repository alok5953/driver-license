import {
    TABLE_OF_CONTENT_GET_SUCCESS, TABLE_OF_CONTENT_COURSE_INFO_GET_SUCCESS, 
    TABLE_OF_CONTENT_CONTAIN_ID, TABLE_OF_CONTENT_LIST_SUCCESS, TABLE_OF_CONTENT_SECURITY_ID,
    TABLE_OF_CONTENT_QUIZ_DETAIL_ID
} from '../../Actions/ActionTypes/UserTableofContentTypes';

const iState = {
    tableofContentSuccessResult: [],
    courseInfoSuccessResult:[],
    tableofContentDetailId: {},
    tableofContentDetailList: [],
    tableofContentDetailQuizId:{},
    tableofContentDetailSecurityId:{},
     
}

export const tableofContentReducer = (state = iState, action) => {
    switch (action.type) {
      case TABLE_OF_CONTENT_GET_SUCCESS:
          
        return {
          ...state,
          tableofContentSuccessResult: action.payload
        }
      case TABLE_OF_CONTENT_COURSE_INFO_GET_SUCCESS:
        return {
          ...state,
          courseInfoSuccessResult: action.payload
        }
    case TABLE_OF_CONTENT_CONTAIN_ID:
        return {
            ...state,
            tableofContentDetailId: action.payload
        }
    case TABLE_OF_CONTENT_LIST_SUCCESS:
      return {
          ...state,
          tableofContentDetailList: action.payload
      }
    case TABLE_OF_CONTENT_SECURITY_ID:
      return {
          ...state,
          tableofContentDetailSecurityId: action.payload
      }
      
    case TABLE_OF_CONTENT_QUIZ_DETAIL_ID:
      return {
          ...state,
          tableofContentDetailQuizId: action.payload
      }

      default:
        return state;
    }
  };