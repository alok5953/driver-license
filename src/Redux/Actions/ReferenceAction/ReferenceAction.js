import { loadingAction } from "../LoadingAction";
import { ReferenceService } from '../../../Services'
import {
    GET_REFERENCE_URL_SUCCESS,SEND_INVITATION_SUCCESS
} from '../ActionTypes/ReferenceTypes'

export const getReferenceUrlAction = () => {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return ReferenceService.getReferenceUrl()
      .then(response => {
        dispatch(loadingAction(false));
        return dispatch({ type: GET_REFERENCE_URL_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const sendInvitationByEmailAction = (email) => {
    return (dispatch) => {
      dispatch(loadingAction(true));
      return ReferenceService.sendInvitationByEmail(email)
        .then(response => {
          dispatch(loadingAction(false));
          return dispatch({ type: SEND_INVITATION_SUCCESS, payload: response });
        })
        .catch(err => {
          dispatch(loadingAction(false));
          throw err;
        });
    };
  };