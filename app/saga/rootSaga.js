import {call, all} from 'redux-saga/effects';
import {watchSearchFood} from './saga';

export default function* rootSaga() {
  yield call(watchSearchFood);
}
