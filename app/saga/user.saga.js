/* eslint-disable prettier/prettier */
import { put, call } from 'redux-saga/effects';
import {UserAction} from '../actions/user.action';


export function* getUser(api) {
  const response = yield call(api.getUser);
  if (response.ok) {
    yield put({ type: UserAction.getUserSuccess, user: response.data });
  }
  else {
    yield put({ type: UserAction.getUserFailure, error: response.data?.title ||  response.problem });
  }
}

export function* updateUser(api,{user}) {
  const response = yield call(api.updateUser, user);
  if (response.ok) {
    yield put({ type: UserAction.updateUserSuccess, user: response.data });
  }
  else {
    yield put({ type: UserAction.updateUserFailure, error: response.data.title || 'Error update' });
  }
}