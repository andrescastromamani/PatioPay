import { types } from '../types/types';
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: action.payload.token
            }
        case types.logout:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            }
        case types.getUser:
            return {
                ...state,
                user: action.payload,
                token: action.payload.token
            }
        default:
            return state;
    }
}
