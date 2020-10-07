/* eslint-disable prettier/prettier */
import {Api} from './api';
import {put, takeLatest} from 'redux-saga/effects';


function* fetchFoods(text) {
  try {
    const reciededFood = yield Api.searchFoodApi(text.value);

    yield put({type: 'SEARCH_SUCCESS', reciededFood: reciededFood});
  } catch (error) {

    yield put({type: 'SEARCH_FAILED', error});
  }
}
export function* watchSearchFood() {
  yield takeLatest('SEARCH_FOOD_REQUEST', fetchFoods);
}
