import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { UserCourseService } from '../../../Services/UserCourseService'
import {
  COURSE_DETAIL_SUCCESS, COURSE_GET_SUCCESS,COURSE_DETAIL_BY_ID_SUCCESS, COURSE_NAME_AND_AMOUNT_SUCCESS
} from '../ActionTypes/UserCourseTypes'

export const getUserCourseListAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserCourseService.getCourseList()
      .then(response => {

        dispatch(loadingAction(false));
        return dispatch({ type: COURSE_GET_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

//   saves course id for module list
export const userCourseDetailAction = (id) => {
  return (dispatch) => {
    const data = {
      data: {
        code: 200,
        id: id,
      }
    }
    return dispatch({ type: COURSE_DETAIL_SUCCESS, payload: data })
  };
};

export const getUserCourseByIdAction = (courseId) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserCourseService.getCourseById(courseId) 
      .then(response => {
     
        dispatch(loadingAction(false));
        return dispatch({ type: COURSE_DETAIL_BY_ID_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const getCourseNameandaAmountAction = (courseId) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return UserCourseService.getCourseNameandAmount(courseId) 
      .then(response => {
    
        dispatch(loadingAction(false));
        return dispatch({ type: COURSE_NAME_AND_AMOUNT_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};
