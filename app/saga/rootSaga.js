/* eslint-disable prettier/prettier */
import {all, takeLatest} from 'redux-saga/effects';
import {login, loginLoad} from './loginSaga';
import API from './api';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import {createAccount, getAccount} from './accountSaga';
import { startup } from './startup.saga';
import CategoryActions from '../actions/category.action';
import { getAllCategories } from './category.saga';
import CuisineAction from '../actions/cuisine.action';
import { getAllCuisines } from './cuisine.saga';
import FoodAction from '../actions/food.action';
import { getAllFood, addToFavorite, getAllFavoriteFood } from './food.saga';
import { OrderAction } from '../actions/order.action';
import { addOrder } from './order.saga';

const api = API.create();
export default function* rootSaga() {
  yield all([
    takeLatest('START_UP', startup),
    takeLatest(LoginActions.loginLoad, loginLoad, api),
    takeLatest(LoginActions.loginRequest, login, api),
    takeLatest(AccountActions.signupRequest, createAccount, api),
    takeLatest(AccountActions.getAccountRequest, getAccount, api),
    takeLatest(CategoryActions.getAllCategoriesRequest, getAllCategories, api),
    takeLatest(CuisineAction.getAllCuisinesRequest, getAllCuisines, api),
    takeLatest(FoodAction.getAllFoodRequest, getAllFood, api),
    takeLatest(FoodAction.addToFavoriteRequest, addToFavorite, api),
    takeLatest(FoodAction.getAllFavoriteFoodRequest, getAllFavoriteFood, api),
    takeLatest(OrderAction.addOrderRequest, addOrder, api),

  ]);
}
