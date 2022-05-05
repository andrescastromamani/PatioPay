import { types } from "../types/types";

const initialState = {
    loading: false,
    error: null,
    clients: []
}

export const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getClients:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.getClientsSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                clients: action.payload
            }
        case types.getClientsFailure:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.getClient:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.getClientSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...state.clients, action.payload]
            }
        case types.getClientFailure:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.createClient:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.createClientSuccess:
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...state.clients, action.payload]
            }
        case types.createClientFailure:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}