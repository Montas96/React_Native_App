/* eslint-disable prettier/prettier */
import CategoryActions from '../actions/category.action';
import { put, call } from 'redux-saga/effects';

export function* getAllCategories(api, { options }) {

    const response = yield call(api.getCategories, options);

    if (response.ok) {
        yield put({
            type: CategoryActions.getAllCategoriesSuccess,
            categories: response.data,
        });
    } else {
        yield put({
            type: CategoryActions.getAllCategoriesFailure,
            error: 'Failed to get CATEGORIES',
        });
    }
}
