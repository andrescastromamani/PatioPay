import axios from 'axios';
import Swal from 'sweetalert2';
import { types } from '../types/types';

export const signIn = (username, password) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('user', username);
        formData.append('pass', password);
        await axios.post('https://labs.patio.com.bo/api-pay/?route=user&type=login', formData)
            .then(async (res) => {
                if (res.data.status === 'SUCCESS') {
                    localStorage.setItem('token', res.data.token);
                    const formData = new FormData();
                    formData.append('token', res.data.token);
                    await axios.post('https://labs.patio.com.bo/api-pay/?route=user&type=get', formData)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.status === 'SUCCESS') {
                                localStorage.setItem('user', JSON.stringify(res.data.data));
                                dispatch({
                                    type: types.login,
                                    payload: res.data
                                });
                            } else {
                                console.log(res.data.message);
                            }
                        })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.data.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            }).catch(err => {
                console.log(err);
            })

    };
}
export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(
            {
                type: types.logout
            }
        );
    };
}

export const getUser = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const formData = new FormData();
        formData.append('token', token);
        await axios.post('https://labs.patio.com.bo/api-pay/?route=user&type=get', formData)
            .then(res => {
                console.log(res.data.data);
                if (res.data.status === 'SUCCESS') {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    dispatch({
                        type: types.getUser,
                        payload: res.data
                    });
                } else {
                    console.log(res.data.message);
                }
            }).catch(err => {
                console.log(err);
            })
    }
}
