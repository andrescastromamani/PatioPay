import { types } from "../types/types";

export const chargesReducer = (state = {}, action) => {
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
        default:
            return state;
    }
}
