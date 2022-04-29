import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chargesReducer } from './chargesReducer';

export default combineReducers({
    auth: authReducer,
    charges: chargesReducer
});