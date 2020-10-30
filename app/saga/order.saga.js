/* eslint-disable prettier/prettier */
import {call, put} from 'redux-saga/effects';
import {OrderAction} from '../actions/order.action';

export function* addOrder(api, {order}) {
  let apiCall;
  if (order.id){
    apiCall = api.updateOrder;
  } else {
    apiCall = api.addToOrderList;
  }
  const response = yield call(apiCall, order);

  if (response.ok) {
    yield put({type: OrderAction.addOrderSuccess, order: response.data});
  } else {
    yield put({type: OrderAction.addOrderFailure, error: 'Can not add order'});
  }
}
export function* getOrder(api, {statusId}) {
  const response = yield call(api.getOrderByStatus, statusId);
  if (response.ok) {
    yield put({type: OrderAction.getOrdersByStatusSuccess, orders: response.data});
  } else {
    yield put({type: OrderAction.getOrdersByStatusFailure, error: 'Can not get orders'});
  }
}
