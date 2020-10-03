import {createStore} from 'redux';
import userReducer from '../reducer/userReducer';

export default createStore(userReducer);
