/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import { put, call } from 'redux-saga/effects';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';

export function* login(api, { value }) {

  const response = yield call(api.login, value);
  if (response.ok) {
    yield call(api.setAuthToken, response.data.id_token);// set token to header after login success for the next apis
    yield put({ type: LoginActions.loginSuccess, id_token: response.data.id_token });
    yield put({ type: AccountActions.getAccountRequest });// get user account information

  } else {
    yield put({ type: LoginActions.loginFailure, error: 'error' });
  }
}


export function* logout(api) {
    yield call(api.removeAuthToken); // remove token from header
    yield put({ type: AccountActions.accountReset }); // reset account

}
