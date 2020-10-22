/* eslint-disable prettier/prettier */
import FoodAction from '../actions/food.action';
import { put, call } from 'redux-saga/effects';

export function* getAllFood(api, { options }) {

    const response = yield call(api.getFoods, options);

    if (response.ok) {
        yield put({
            type: FoodAction.getAllFoodSuccess,
            foods: response.data,
        });
    } else {
        yield put({
            type: FoodAction.getAllFoodFailure,
            error: 'Failed to get Foods',
        });
    }
}
