/* eslint-disable prettier/prettier */
import { OrderAction } from '../actions/order.action';
import { parseHeaderForLinks } from './../shared/utils/url-utils';

const initialState = {
    order: null,
    validatedOrder: null,
    orders: [],
    addingOrder: false,
    addOrderError: null,
    status: null,
    fetchOrders: false,
    fetchOrderError: null,
    ordersLink: { total: 0 },
    fetchClosedOrder: false,
    closedOrderError: null,
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
                order: null,
                orders: [action.order],
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
            if (!action.orders.length) {
                nextState = {
                    ...state,
                    status: null,
                    fetchOrders: false,
                    fetchOrderError: null,
                };
                return nextState;
            }
            if (state.status === 'CLOSED') {
                const header = action.header;
                const link = parseHeaderForLinks(header.link);
                nextState = {
                    ...state,
                    orders: [...state.orders,...action.orders],
                    order: null,
                    status: null,
                    validatedOrder: null,
                    fetchOrders: false,
                    fetchOrderError: null,
                    ordersLink: link,
                };
            } else {
            if (action.orders[0].orderStatus?.id === 'CREATED') {
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
                    validatedOrder: action.orders[0],
                    status: null,
                    fetchOrders: false,
                    fetchOrderError: null,
                };
            }
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
        case OrderAction.getClosedOrderRequest:
            nextState = {
                ...state,
                status: action.statusId,
                fetchClosedOrder: true,
                closedOrderError: null,
            };
            return nextState;
        case OrderAction.getClosedOrderSuccess:
            const header = action.header;
            const link = parseHeaderForLinks(header.link);
            nextState = {
                ...state,
                orders: [...state.orders, ...action.orders],
                status: null,
                fetchClosedOrder: false,
                closedOrderError: null,
                ordersLink: link,
            };
            return nextState;
        case OrderAction.getClosedOrderFailure:
            nextState = {
                ...state,
                status: null,
                fetchClosedOrder: false,
                closedOrderError: null,
                ordersLink: link,
            };
            return nextState;
        case OrderAction.resetOrders:
            nextState = {
                ...state,
                status: null,
                fetchOrders: false,
                fetchOrderError: null,
                ordersLink: { next: 0 },
                orders: [],
            };
            return nextState;
        default:
            return initialState;
    }
}
export default OrderReducer;
