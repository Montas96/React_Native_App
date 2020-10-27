/* eslint-disable prettier/prettier */
import { OrderAction } from '../actions/order.action';

const initialState = {
    order: null,
    orders: [],
    addingOrder: false,
    addOrderError: null,
    status: null,
    fetchOrders: false,
    fetchOrderError: null,
};

function OrderReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case OrderAction.addOrderRequest:
            nextState = {
                ...state,
                addingOrder: true,
                addOrderError: null,
            };
            return nextState;
        case OrderAction.addOrderSuccess:
            nextState = {
                ...state,
                order: action.order,
                addingOrder: false,
                addOrderError: null,
            };
            return nextState;
        case OrderAction.addOrderFailure:
            nextState = {
                ...state,
                addingOrder: false,
                addOrderError: action.error,
            };
            return nextState;
        case OrderAction.resetOrder:
            nextState = {
                ...state,
                order: null,
                addingOrder: false,
                addOrderError: null,
            };
            return nextState;
        /** ADD order Line */
        case OrderAction.addOrderLineRequest:
            let order = { ...state.order };
            if (!order.orderLines || !order.orderLines.length) {
                order.orderLines = [action.orderLine];
            } else {
                const index = order.orderLines.findIndex(item => {
                    return item.food.id === action.orderLine.food?.id;
                });
                index !== -1 ? order.orderLines.splice(index, 1) :
                    order.orderLines = [...order.orderLines, action.orderLine];
            }
            nextState = {
                ...state,
                order: order,
            };
            return nextState;
        /** edit order */
        case OrderAction.editOrder:
            nextState = {
                ...state,
                order: action.order,
            };
            return nextState;
        /** get order by status */
        case OrderAction.getOrdersByStatusRequest:
            nextState = {
                ...state,
                status: action.statusId,
                fetchOrders: true,
                fetchOrderError: null,
            };
            return nextState;
        case OrderAction.getOrdersByStatusSuccess:
            if (state.status === 'CREATED' && action.orders.length) {
                nextState = {
                    ...state,
                    order: action.orders[0],
                    status: null,
                    fetchOrders: false,
                    fetchOrderError: null,
                };
            } else {
                nextState = {
                    ...state,
                    orders: action.orders,
                    status: null,
                    fetchOrders: false,
                    fetchOrderError: null,
                };
            }
            return nextState;
        case OrderAction.getOrdersByStatusFailure:
            nextState = {
                ...state,
                status: null,
                fetchOrders: false,
                fetchOrderError: action.error,
            };
            return nextState;
        case OrderAction.resetAll:
            return initialState;
        default:
            return initialState;
    }
}
export default OrderReducer;
