
import {
    FORGOT_PASSWORD_CONTAIN_EMAIL, FORGOT_PASSWORD_CONTAIN_OTP
} from "../../Actions/ActionTypes/ActionTypes";

const iState = {
    email: {},
    otp: {}
};

export const commonReducer = (state = iState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_CONTAIN_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case FORGOT_PASSWORD_CONTAIN_OTP:
            return {
                ...state,
                otp: action.payload
            }
        default:
            return state;
    }
};
