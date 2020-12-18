/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import { put, call, select } from 'redux-saga/effects';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import { OrderAction } from '../actions/order.action';
import FoodAction from '../actions/food.action';
import { UserAction } from '../actions/user.action';

export function* login(api, { value }) {

  const response = yield call(api.login, value);
  if (response.ok) {
    yield call(api.setAuthToken, response.data.id_token);// set token to header after login success for the next apis
    yield put({ type: LoginActions.loginSuccess, id_token: response.data.id_token });
    yield put({ type: AccountActions.getAccountRequest });// get user account information
    yield put({type: FoodAction.getAllFavoriteFoodRequest});
    yield put({type: UserAction.getUserRequest});
  } else {
    yield put({ type: LoginActions.loginFailure, error: 'error' });
  }
}
export const selectAuthToken = (state) =>{
  return  state.login.authToken;
};

export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken);
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken); // if it exist set to api header
  }
  yield put({type: LoginActions.loginLoadSuccess}); // loading finish
}

export function* logout(api) {
    yield call(api.removeAuthToken); // remove token from header
    yield put({ type: AccountActions.accountReset }); // reset account
    yield put({ type: OrderAction.resetAll }); // reset order

  }
