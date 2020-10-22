/* eslint-disable prettier/prettier */
import CuisineActions from '../actions/cuisine.action';
import { put, call } from 'redux-saga/effects';

export function* getAllCuisines(api, { options }) {

    const response = yield call(api.getCuisines, options);

    if (response.ok) {
        yield put({
            type: CuisineActions.getAllCuisinesSuccess,
            cuisines: response.data,
        });
    } else {
        yield put({
            type: CuisineActions.getAllCuisinesFailure,
            error: 'Failed to get Cuisine',
        });
    }
}
