import { loadingAction } from "../LoadingAction";
import { removeItemLocalStorage } from '../../../Utils/Util';
import { TypingDnaService } from '../../../Services/TypingDnaService'
import {
    GET_QUOTES_DETAIL_SUCCESS, TYPING_DNA_SAVE_SUCCESS, TYPING_DNA_VERIFY_SUCCESS, CHECK_USER_SUCCESS,TYPING_DNA_SESSION_VERIFIED_USER_SUCCESS
} from '../ActionTypes/TypingDnaTypes'

export const getQuotesAction = (min,max) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return TypingDnaService.getQuotes(min,max)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: GET_QUOTES_DETAIL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const typingDnaSaveAction = (typing_pattern) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return TypingDnaService.typing_dna_save(typing_pattern)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: TYPING_DNA_SAVE_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const typingDnaVerifyAction = (typing_dna_data_list) => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return TypingDnaService.typing_dna_verify(typing_dna_data_list)
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: TYPING_DNA_VERIFY_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const checkUserAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true)); 
    return TypingDnaService.check_user()
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: CHECK_USER_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};
export const typing_dna_session_verified_userAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true)); 
    return TypingDnaService.typing_dna_session_verified_user()
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: TYPING_DNA_SESSION_VERIFIED_USER_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

