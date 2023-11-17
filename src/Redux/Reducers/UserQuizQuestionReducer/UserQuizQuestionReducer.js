import {
  QUIZ_QUESTION_ANSWER_VERIFY_SCCUESS
   } from '../../Actions/ActionTypes/UserQuizQuestionTypes'
   
   const iState = {

     userVerifyQuizAnswerSuccess: {}, 
   };
   
   export const userQuizQuestionRecucer = (state = iState, action) => {
     switch (action.type) {
       case QUIZ_QUESTION_ANSWER_VERIFY_SCCUESS:
         return {
           ...state,
           userVerifyQuizAnswerSuccess: action.payload
         }

       
       default:
         return state;
     }
   };
   
   