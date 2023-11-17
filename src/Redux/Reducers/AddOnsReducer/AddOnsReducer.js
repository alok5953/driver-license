import {
    ADD_ONS_LIST_SUCCESS, ADD_ONS_ADD_SUCCESS, ADD_ONS_UPDATE_SUCCESS, ADD_ONS_GETBYID_SUCCESS, ADD_ONS_DELETE_SUCCESS
} from '../../Actions/ActionTypes/AddOnsTypes'

const iState = {
    addOnseDetailList: {},
    updateAddOnsSuccessResult: {},
    saveAddOnsSuccessResult: {},
    deleteAddOnsResult: {},
    updateQuizeStatusResult: {},
    getAddOnsByIdSuccuessResult: {},
    quizeContentDetail:{}
};

export const addOnsReducer = (state = iState, action) => {

    switch (action.type) {
        case ADD_ONS_LIST_SUCCESS:
            return {
                ...state,
                addOnseDetailList: action.payload
            }
        case ADD_ONS_UPDATE_SUCCESS:
            return {
                ...state,
                updateAddOnsSuccessResult: action.payload
            }
        case ADD_ONS_ADD_SUCCESS:
            return {
                ...state,
                saveAddOnsSuccessResult: action.payload
            }
        case ADD_ONS_GETBYID_SUCCESS:
            return {
                ...state,
                getAddOnsByIdSuccuessResult: action.payload
            }

        case ADD_ONS_DELETE_SUCCESS:
            return {
                ...state,
                deleteAddOnsResult: action.payload
            }
       
        default:
            return state;
    }
};