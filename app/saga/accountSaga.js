/* eslint-disable prettier/prettier */
import { put, call } from 'redux-saga/effects';
import AccountActions from '../actions/accountActions';


export function* createAccount(api, { user }) {
  const response = yield call(api.register, user);
  if (response.ok) {
    yield put({ type: AccountActions.signupSuccess });
  }
  else {
    yield put({ type: AccountActions.signupFailure, error: response.data.title });
  }
}

export function* getAccount(api) {
  const response = yield call(api.getAccount);
  console.log('6-get account request');

  if (response.ok) {
    console.log('6-get account success');
    yield put({ type: AccountActions.getAccountSuccess, account: response.data });
  }
  else {
    console.log('6- get account FAILURE');
    yield put({ type: AccountActions.getAccountFailure, error: 'Failed to get account' });
  }
}

