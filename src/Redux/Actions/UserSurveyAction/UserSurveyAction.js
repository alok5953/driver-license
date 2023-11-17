import { loadingAction } from "../LoadingAction";
import { userRecordSurveyService } from '../../../Services/UserRecordSurvey'
import {
  UPDATE_USER_SURVEY,USER_CHECK_FEEDBACK_SUCCESS
} from '../ActionTypes/UserRecordSurveyTypes'


export const updateUserSurveyAction = (data) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return userRecordSurveyService.updateUserSurvey(data)
        .then(response => {
  
          dispatch(loadingAction(false));
          return dispatch({ type: UPDATE_USER_SURVEY, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  }; 

  export const userCheckFeedbackAction = () => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return userRecordSurveyService.userFeedbackCheck()
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: USER_CHECK_FEEDBACK_SUCCESS, payload: response });
        })
        .catch(err => {
          console.log('********',err)
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };