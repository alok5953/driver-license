import {LOADING} from './../ActionTypes/ActionTypes'

export const loadingAction = status => {
    return dispatch => {
      dispatch ({type: LOADING, status});
       
    };
  };