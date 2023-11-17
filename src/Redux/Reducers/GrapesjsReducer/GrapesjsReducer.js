import {GrapesjsService} from '../../../Services/GrapesjsService';
import {
    GRAPESJS_GET_ASSETS_SUCCESS,GRAPESJS_GETBYID_SUCCESS,GRAPESJS_ADD_SUCCESS,GRAPESJS_UPDATE_SUCCESS,
    GRAPESJS_UPDATE_METADATA_SUCCESS,GRAPESJS_UPLOAD_ASSETS_SUCCESS, H5P_GET_ALL_SUCCESS
} from '../../Actions/ActionTypes/GrapesjsType';

const iState = {
    addGrapesjsSuccessResult: [],
    getGrapesjsByIdSuccessResult: [],
    updateGrapesjsSuccessResult: [],
    updateGrapesjsMetadataSuccessResult: [],
    uploadAssetsSuccessResult:[],
    getAssetsSuccessResult: [],
    getH5PSuccessResult:[],
}

export const grapesjsReducer = (state = iState, action) => {
    
    switch(action.type) {
        case GRAPESJS_GETBYID_SUCCESS:
            return {
                ...state,
                getGrapesjsByIdSuccessResult: action.payload
            }
        case GRAPESJS_ADD_SUCCESS:
            return {
                ...state,
                addGrapesjsSuccessResult: action.payload
            }
        case GRAPESJS_UPDATE_SUCCESS:
            return {
                ...state,
                updateGrapesjsSuccessResult: action.payload
            }
        case GRAPESJS_UPDATE_METADATA_SUCCESS:
            return {
                ...state,
                updateGrapesjsMetadataSuccessResult: action.payload
            }
        case GRAPESJS_UPLOAD_ASSETS_SUCCESS:
            return {
                ...state,
                uploadAssetsSuccessResult: action.payload
            }
        case GRAPESJS_GET_ASSETS_SUCCESS:
            return {
                ...state,
                getAssetsSuccessResult: action.payload
            }
        case H5P_GET_ALL_SUCCESS:
            return {
                ...state,
                getH5PSuccessResult: action.payload
            }
        default:
            return state;
    }
}