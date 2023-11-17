import { loadingAction } from "../LoadingAction";
import { AdminSideUserSectionService } from '../../../Services/AdminSideUserSectionService'
import {
    ADMIN_SIDE_USER_DETAIL_SUCCESS, ADMIN_SIDE_USER_UPDATE_EXPIRY_DATE
} from '../ActionTypes/AdminSideUserSectionTypes'

export const getUserDetailListAction = (pageNo, size,course_id,search,from,to) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AdminSideUserSectionService.getUserDetailList(pageNo, size,course_id,search,from,to)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: ADMIN_SIDE_USER_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const updateCourseExpiryDateAction = (id, data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return AdminSideUserSectionService.updateExpiryDate(id, data)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: ADMIN_SIDE_USER_UPDATE_EXPIRY_DATE, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};