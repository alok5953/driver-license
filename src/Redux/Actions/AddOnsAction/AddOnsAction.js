import { loadingAction } from "../LoadingAction";
import { AddOnsService } from '../../../Services';
import {
    ADD_ONS_LIST_SUCCESS, ADD_ONS_ADD_SUCCESS, ADD_ONS_UPDATE_SUCCESS, ADD_ONS_GETBYID_SUCCESS, ADD_ONS_DELETE_SUCCESS
} from '../ActionTypes/AddOnsTypes'

 
// get add-ons detail list
export const getAddOnsDetailAction = (pageNo, size) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AddOnsService.getAddOnsList(pageNo, size)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: ADD_ONS_LIST_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// save add-ons
export const saveAddOnsAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AddOnsService.saveAddOns(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: ADD_ONS_ADD_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// get add-ons detail by id
export const getAddOnsByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AddOnsService.getAddOnsById(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: ADD_ONS_GETBYID_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// delete addons 
export const deleteAddOnsAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AddOnsService.deleteAddOns(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: ADD_ONS_DELETE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};

// update add-ons
export const updateAddOnsAction = (id, data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return AddOnsService.updateAddOns(id, data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({ type: ADD_ONS_UPDATE_SUCCESS, payload: response });
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            });
    };
};



