import {
   SECURITY_QUESTION_ANSWER_SCCUESS, SECURITY_QUESTION_ANSWER_VERIFY_SCCUESS
  } from '../../Actions/ActionTypes/UserSecurityQuestionTypes'
  
  const iState = {
    userSaveQuestionAnswerSuccess: {},
    userVerifyQuestionAnswerSuccess: {}, 
  };
  
  export const userSecurityQuestionReducer = (state = iState, action) => {
    switch (action.type) {
      case SECURITY_QUESTION_ANSWER_SCCUESS:
        return {
          ...state,
          userSaveQuestionAnswerSuccess: action.payload
        }
    case SECURITY_QUESTION_ANSWER_VERIFY_SCCUESS:
        return {
            ...state,
            userVerifyQuestionAnswerSuccess: action.payload
        }
      
      default:
        return state;
    }
  };
  
  