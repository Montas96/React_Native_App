/* eslint-disable prettier/prettier */
import {all, takeLatest} from 'redux-saga/effects';
import {login} from './loginSaga';
import API from './api';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import {createAccount, getAccount} from './accountSaga';

const api = API.create();
export default function* rootSaga() {
  yield all([
    takeLatest(LoginActions.loginRequest, login, api),
    takeLatest(AccountActions.signupRequest, createAccount,api),
    takeLatest(AccountActions.getAccountRequest, getAccount,api),
  ]);
}
