/* eslint-disable prettier/prettier */
import {call, put} from 'redux-saga/effects';
import {OrderAction} from '../actions/order.action';

export function* addOrder(api, {order}) {
  const response = yield call(api.addToOrderList, order);
  if (response.ok) {
    yield put({type: OrderAction.addOrderSuccess, order: response.data});
  } else {
    yield put({type: OrderAction.addOrderFailure, error: 'Can not add order'});
  }
}
