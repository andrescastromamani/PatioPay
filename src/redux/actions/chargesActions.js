import { types } from "../types/types";
import axiosClient from '../../config/axios';

export const getCharges = () => {
    return async (dispatch) => {
        dispatch({
            type: types.getCharges
        })
        try {
            const response = await axiosClient.get('/charges');
            dispatch({
                type: types.getChargesSuccess,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: types.getChargesFailure,
                payload: error.response.data.message
            })
        }
    }
}
export const addCharge = (charge) => {
    return async (dispatch) => {
        dispatch({
            type: types.createCharge,
            payload: charge
        });
        try {
            await axiosClient.post('/charges', charge);
            dispatch({
                type: types.createChargeSuccess,
                payload: charge
            });
        } catch (error) {
            dispatch({
                type: types.createChargeFailure,
                payload: error.message
            });
        }
    };
}
export const getCharge = (id) => {
    return async (dispatch) => {
        dispatch({
            type: types.getCharge,
            payload: id
        });
        try {
            const response = await axiosClient.get(`/charges/${id}`);
            dispatch({
                type: types.getChargeSuccess,
                payload: response.data.data
            });
        } catch (error) {
            dispatch({
                type: types.getChargeFailure,
                payload: error.response.data.message
            });
        }
    }
}