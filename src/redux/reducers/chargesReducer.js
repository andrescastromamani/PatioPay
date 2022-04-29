import { types } from "../types/types";

const initialState = {
    loading: false,
    error: null,
    charges: []
}
export const chargesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getCharges:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.getChargesSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                charges: action.payload
            }
        case types.getChargesFailure:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.createCharge:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.createChargeSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                charges: [...state.charges, action.payload]
            }
        case types.createChargeFailure:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
