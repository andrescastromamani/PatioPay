import {
    ADD_MERCHANT,
    ADD_MERCHANT_SUCCESS,
    ADD_MERCHANT_FAILURE,
    GET_MERCHANTS,
    GET_MERCHANTS_SUCCESS,
    GET_MERCHANTS_FAILURE,
    GET_MERCHANT,
    EDIT_MERCHANT_SUCCESS,
} from '../types';
const initialState = {
    merchants: [],
    merchantEdit: {
        name: '',
        email: '',
        city: '',
        lat: '',
        lng: '',
        address: '',
        pincode: '',
        priority: '',
        phone: '',
        image: '',
        category: '',
    },
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
                merchantEdit: action.payload,
            }
        case EDIT_MERCHANT_SUCCESS:
            return {
                ...state,
                loading: false,
                merchants: state.merchants.map(merchant => merchant.id === action.payload.id ? action.payload : merchant)
            }
        default:
            return state;
    }
}