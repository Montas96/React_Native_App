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
export function* getOrder(api, {statusId, options}) {
  const response = yield call(api.getOrderByStatus, statusId, options);
  if (response.ok) {
    yield put({type: OrderAction.getOrdersByStatusSuccess, orders: response.data, header: response.headers});
  } else {
    yield put({type: OrderAction.getOrdersByStatusFailure, error: 'Can not get orders'});
  }
}
export function* getClosedOrder(api, {options}) {
  const response = yield call(api.getClosedOrder, options);
  if (response.ok) {
    yield put({type: OrderAction.getClosedOrderSuccess, orders: response.data, header: response.headers});
  } else {
    yield put({type: OrderAction.getClosedOrderFailure, error: 'Can not get orders'});
  }
}
