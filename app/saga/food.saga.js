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
export function* addToFavorite(api, { food }) {

    const response = yield call(api.addToFavorite, food);

    if (response.ok) {
        yield put({
            type: FoodAction.addToFavoriteSuccess,
            favorites: response.data,
        });
    } else {
        yield put({
            type: FoodAction.addToFavoriteFailure,
            error: 'Failed to add Food to favorites',
        });
    }
};
export function* getAllFavoriteFood(api) {

    const response = yield call(api.getAllFavoriteFoods);
    console.log('getAllFavoriteFood');
    if (response.ok) {
        yield put({
            type: FoodAction.getAllFavoriteFoodSuccess,
            favorites: response.data,
        });
    } else {
        yield put({
            type: FoodAction.getAllFavoriteFoodFailure,
            error: 'Failed to get all a favorite Foods.',
        });
    }
};