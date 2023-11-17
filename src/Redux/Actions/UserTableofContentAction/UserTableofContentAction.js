import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { userTableofContentService } from '../../../Services/UserTableofContentService'
import {TABLE_OF_CONTENT_GET_SUCCESS, TABLE_OF_CONTENT_COURSE_INFO_GET_SUCCESS, 
  TABLE_OF_CONTENT_CONTAIN_ID, TABLE_OF_CONTENT_LIST_SUCCESS, TABLE_OF_CONTENT_SECURITY_ID,
  TABLE_OF_CONTENT_QUIZ_DETAIL_ID

} from '../ActionTypes/UserTableofContentTypes'

//  get list of table of contents
export const getTableofContentListAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return userTableofContentService.getTableofContentList(id)
        .then(response => {
      
          dispatch(loadingAction(false));
          return dispatch({ type: TABLE_OF_CONTENT_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  //  get course info by id 
  export const getTableofContentCourseInfoAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return userTableofContentService.getCourseInfoById(id)
        .then(response => {
      
          dispatch(loadingAction(false));
          return dispatch({ type: TABLE_OF_CONTENT_COURSE_INFO_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  //  save table of content id 
  export const tableofContentDetailAction = (id) => {
    return (dispatch) => {
        const data = {
            data: {
                code: 200,
                id: id,
            }
        }
        return dispatch({ type: TABLE_OF_CONTENT_CONTAIN_ID, payload: data })
    };
  };


  // tableofContent list saved
  export const tableofContentListAction = (tableofContentList) => {
    return (dispatch) => {
        const data = {
            data: tableofContentList,
        }
        return dispatch({ type: TABLE_OF_CONTENT_LIST_SUCCESS, payload: data })
    };
  };


export const tableofContentQuizDetailAction = (id) => {

  return (dispatch) => {
      const data = {
          data: {
              code: 200,
              id: id,
          }
      }
      return dispatch({ type: TABLE_OF_CONTENT_QUIZ_DETAIL_ID, payload: data })
  }
}

export const tableofContentSecurityDetailAction = (id) => {
  return (dispatch) => {
      const data = {
          data: {
              code: 200,
              id: id,
          }
      }
      return dispatch({ type: TABLE_OF_CONTENT_SECURITY_ID, payload: data })
  }
}