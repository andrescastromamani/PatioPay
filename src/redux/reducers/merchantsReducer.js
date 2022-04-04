import {
    ADD_MERCHANT,
    ADD_MERCHANT_SUCCESS,
    ADD_MERCHANT_FAILURE,
    GET_MERCHANTS,
    GET_MERCHANTS_SUCCESS,
    GET_MERCHANTS_FAILURE,
    GET_MERCHANT,
    GET_MERCHANT_SUCCESS,
    GET_MERCHANT_FAILURE
} from '../types';
const initialState = {
    merchants: [],
    merchantEdit: null,
    loading: false,
    error: null
};

export default function merchantsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MERCHANT:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ADD_MERCHANT_SUCCESS:
            return {
                ...state,
                loading: false,
                merchants: [...state.merchants, action.payload]
            }
        case ADD_MERCHANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_MERCHANTS:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_MERCHANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                merchants: action.payload
            }
        case GET_MERCHANTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_MERCHANT:
            return {
                ...state,
                loading: true,
                merchantEdit: null,
            }
        default:
            return state;
    }
}