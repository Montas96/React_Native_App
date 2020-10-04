import {createStore, combineReducers} from 'redux';
import userReducer from '../reducer/userReducer';
import foodReducer from '../reducer/foodReducer';

export default createStore(
  combineReducers({user: userReducer, food: foodReducer}),
);
