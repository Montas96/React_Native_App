/* eslint-disable prettier/prettier */
import {all, takeLatest} from 'redux-saga/effects';
import {login, loginLoad} from './loginSaga';
import API from './api';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import {createAccount, getAccount} from './accountSaga';
import { startup } from './startup.saga';

const api = API.create();
export default function* rootSaga() {
  yield all([
    takeLatest('START_UP', startup),
    takeLatest(LoginActions.loginLoad, loginLoad, api),
    takeLatest(LoginActions.loginRequest, login, api),
    takeLatest(AccountActions.signupRequest, createAccount,api),
    takeLatest(AccountActions.getAccountRequest, getAccount,api),
  ]);
}
