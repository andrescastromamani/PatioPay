import { combineReducers } from 'redux';
import merchantsReducer from './merchantsReducer';

export default combineReducers({
    merchants: merchantsReducer
});