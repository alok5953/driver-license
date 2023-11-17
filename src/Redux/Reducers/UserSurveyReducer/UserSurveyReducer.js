import {
    UPDATE_USER_SURVEY
  } from '../../Actions/ActionTypes/UserRecordSurveyTypes'
  
  const iState = {
    userUpdateSurveySuccess: {}
  };
  
  export const userRecordSurveyRecucer = (state = iState, action) => {
    switch (action.type) {
      case UPDATE_USER_SURVEY:
        return {
          ...state,
          userUpdateSurveySuccess: action.payload
        }
      
      default:
        return state;
    }
  };
  
  