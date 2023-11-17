import { loadingAction } from "../LoadingAction";
import {GrapesjsService} from '../../../Services/GrapesjsService';
import {
    GRAPESJS_GET_ASSETS_SUCCESS,GRAPESJS_GETBYID_SUCCESS,GRAPESJS_ADD_SUCCESS,GRAPESJS_UPDATE_SUCCESS,
    GRAPESJS_UPDATE_METADATA_SUCCESS,GRAPESJS_UPLOAD_ASSETS_SUCCESS, H5P_GET_ALL_SUCCESS
} from '../ActionTypes/GrapesjsType';

export const getGrapesjsByIdAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.getGrapesjsById(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_GETBYID_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const addGrapesjsAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.addGrapesjs(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_ADD_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const updateGrapesjsAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.updateGrapesjs(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_UPDATE_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const updateGrapesjsMetadataAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.updateGrapesjsMetadata(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_UPDATE_METADATA_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const uploadGrapesjsAssetsAction = (data) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.uploadGrapesjsAssets(data)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_UPLOAD_ASSETS_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const getGrapesjsAssetsAction = (id) => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.getGrapesjsAssets(id)
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: GRAPESJS_GET_ASSETS_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}

export const getH5PContentAction = () => {
    return (dispatch) => {
        dispatch(loadingAction(true));
        return GrapesjsService.getH5PContent()
            .then(response => {
                dispatch(loadingAction(false));
                return dispatch({type: H5P_GET_ALL_SUCCESS, payload: response})
            })
            .catch(err => {
                dispatch(loadingAction(false));
                throw err;
            })
    }
}
