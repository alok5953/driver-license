import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { userQuizQuestionService } from '../../../Services/UserQuizQuestionService'
import {QUIZ_QUESTION_ANSWER_VERIFY_SCCUESS

} from '../ActionTypes/UserQuizQuestionTypes'


//  get list of security question verify
export const quizQuestionAnswerVerifyAction = (data) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return userQuizQuestionService.quizAnswerVerify(data)
        .then(response => {
      
          dispatch(loadingAction(false));
          return dispatch({ type: QUIZ_QUESTION_ANSWER_VERIFY_SCCUESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };
