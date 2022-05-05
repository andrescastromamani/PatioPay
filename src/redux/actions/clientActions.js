import { types } from "../types/types";
import axiosClient from '../../config/axios';

export const getClients = () => {
    return async (dispatch) => {
        dispatch({
            type: types.getClients
        });
        try {
            const response = await axiosClient.get('/clients');
            dispatch({
                type: types.getClientsSuccess,
                payload: response.data
            });
        }
        catch (error) {
            dispatch({
                type: types.getClientsFailure,
                payload: error.response.data.message
            });
        }
    }
}
export const getClient = (id) => {
    return async (dispatch) => {
        dispatch({
            type: types.getClient,
            payload: id
        });
        try {
            const response = await axiosClient.get(`/clients/${id}`);
            dispatch({
                type: types.getClientSuccess,
                payload: response.data.data
            })
        }
        catch (error) {
            dispatch({
                type: types.getClientFailure,
                payload: error.response.data.message
            })
        }
    }
}
export const addClient = (client) => {
    return async (dispatch) => {
        dispatch({
            type: types.createClient,
            payload: client
        })
        try {
            await axiosClient.post('/clients', client);
            dispatch({
                type: types.createClientSuccess,
                payload: client
            });
        }
        catch (error) {
            dispatch({
                type: types.createClientFailure,
                payload: error.message
            });
        }
    }
}