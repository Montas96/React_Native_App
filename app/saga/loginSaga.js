/* eslint-disable prettier/prettier */
import {Api} from './api';
import {put, takeLatest} from 'redux-saga/effects';
import LoginActions from '../actions/loginAction';


function* login({value}) {

    try {
        const response = yield Api.login(value);
        yield put({type: LoginActions.loginSuccess, id_token: response.id_token});
      } catch (error) {
        yield put({type: LoginActions.loginFailure, error});
      }
}
export function* watchLogin() {
  yield takeLatest(LoginActions.loginRequest, login);
}
