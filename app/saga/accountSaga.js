/* eslint-disable prettier/prettier */
import {put, call} from 'redux-saga/effects';
import AccountActions from '../actions/accountActions';


export function* createAccount(api, {user}) {
    const response = yield  call(api.register ,user);
    if (response.ok) {
        yield put({type: AccountActions.signupSuccess});
    }
    else {
    yield put({type: AccountActions.signupFailure, error: response.data.title});
  }
}

export function* getAccount(api) {
  const response = yield  call(api.getAccount);
  if (response.ok) {
      yield put({type: AccountActions.getAccountSuccess, account: response.data});
  }
  else {
  yield put({type: AccountActions.getAccountFailure, error: 'error'});
}
}

