/* eslint-disable prettier/prettier */
import {call, all} from 'redux-saga/effects';
import {watchSearchFood} from './saga';
import {watchLogin} from './loginSaga';

export default function* rootSaga() {
  yield all([watchSearchFood(),watchLogin()]);
}
