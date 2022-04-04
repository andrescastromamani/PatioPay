import Swal from 'sweetalert2';

import {
    ADD_MERCHANT,
    ADD_MERCHANT_SUCCESS,
    ADD_MERCHANT_FAILURE,
    GET_MERCHANTS,
    GET_MERCHANTS_SUCCESS,
    GET_MERCHANTS_FAILURE,
    GET_MERCHANT,
    GET_MERCHANT_SUCCESS,
    GET_MERCHANT_FAILURE,
} from '../types';
import axiosClient from '../../config/axios';

export const addMerchantAction = (merchant) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_MERCHANT,
            payload: merchant
        });
        try {
            await axiosClient.post('/merchants', merchant)
            dispatch({
                type: ADD_MERCHANT_SUCCESS,
                payload: merchant

            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ADD_MERCHANT_FAILURE,
                payload: error
            });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}

export const getMerchantsAction = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_MERCHANTS,
            payload: null
        });
        try {
            const response = await axiosClient.get('/merchants');
            dispatch({
                type: GET_MERCHANTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_MERCHANTS_FAILURE,
                payload: error
            });
        }
    }
}

export const getMerchantAction = (merchant) => {
    return async (dispatch) => {
        dispatch({
            type: GET_MERCHANT,
            payload: merchant
        });
        try {
            const response = await axiosClient.get(`/merchants/${merchant}`);
            dispatch({
                type: GET_MERCHANT_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_MERCHANT_FAILURE,
                payload: error
            });
        }
    }
}