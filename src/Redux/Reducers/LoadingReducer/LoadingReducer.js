import { LOADING } from './../../Actions/ActionTypes/ActionTypes';

let iState = {
  loading: false,
};

export const loadingReducer = (state = iState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.status };
    default:
      return state;
  }
};
