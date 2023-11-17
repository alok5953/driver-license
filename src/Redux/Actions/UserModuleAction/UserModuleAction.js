import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { UserModuleService } from '../../../Services/UserModuleService'
import {H5P_PLAY_GET_SUCCESS, COURSE_MODULE_GET_SUCCESS,COURSE_MODULE_SECURITY_GET_SUCCESS,COURSE_MODULE_QUIZ_GET_SUCCESS, QUIZ_MODULE_GET_SUCCESS
} from '../ActionTypes/UserModuleType'

export const getModuleByIdAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return UserModuleService.getModuleById(id)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: COURSE_MODULE_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  export const getH5PAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return UserModuleService.getH5P(id)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: H5P_PLAY_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  export const getSecurityModuleByIdAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return UserModuleService.getSecurityModuleById(id)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: COURSE_MODULE_SECURITY_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  export const getUserQuizByIdAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return UserModuleService.getQuizById(id)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: COURSE_MODULE_QUIZ_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };

  export const getUserQuizModuleByIdAction = (id) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return UserModuleService.getQuizModuleById(id)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: QUIZ_MODULE_GET_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };