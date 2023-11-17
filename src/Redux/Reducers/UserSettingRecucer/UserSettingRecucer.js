import {
    USER_DETAIL_SUCCESS
  } from '../../Actions/ActionTypes/UserSettingTypes'
  
  const iState = {
    userDetailData: {}
  };
  
  export const userSettingRecucer = (state = iState, action) => {
    switch (action.type) {
      case USER_DETAIL_SUCCESS:
        return {
          ...state,
          userDetailData: action.payload
        }
      
      default:
        return state;
    }
  };
  
  