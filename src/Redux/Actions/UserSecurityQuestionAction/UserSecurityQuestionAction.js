import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { userSecurityQuestionService } from '../../../Services/UserSecurityQuestionService'
import {
  SECURITY_QUESTION_ANSWER_SCCUESS, SECURITY_QUESTION_ANSWER_VERIFY_SCCUESS, CHECK_SECURITY_QUESTION_DONE_OR_NOT_SUCCESS

} from '../ActionTypes/UserSecurityQuestionTypes'

//  get list of security question verify
export const securityQuestionAnswerVerifyAction = (data) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return userSecurityQuestionService.securityQuestionAnswerVerify(data)
      .then(response => {

        dispatch(loadingAction(false));
        return dispatch({ type: SECURITY_QUESTION_ANSWER_VERIFY_SCCUESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};
//  save  security question answer
export const saveSecurityQuestionAnswerAction = (detail) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return userSecurityQuestionService.saveSecurityQuestionAnswer(detail)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: SECURITY_QUESTION_ANSWER_SCCUESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const checkUserSecurityQuestionDoneOrNotAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return userSecurityQuestionService.checkUserSecurityQuestionDoneOrNot()
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: CHECK_SECURITY_QUESTION_DONE_OR_NOT_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  }; 
};