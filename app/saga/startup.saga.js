/* eslint-disable prettier/prettier */
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import {put} from 'redux-saga/effects';
import FoodAction from '../actions/food.action';
import {UserAction} from '../actions/user.action';

export function* startup() {
    console.log('2-start up saga ');
  yield put({type: LoginActions.loginLoad});// set loading to true and check if we have a token
  yield put({type: AccountActions.getAccountRequest});// get account
  yield put({type: FoodAction.getAllFavoriteFoodRequest});
  yield put({type: UserAction.getUserRequest});
  yield put({type: 'SET_REHYDRATION_COMPLETE'});//rehydration is complete: we get the information from localstorage
}
