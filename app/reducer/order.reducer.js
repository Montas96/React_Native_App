/* eslint-disable prettier/prettier */
import { OrderAction } from '../actions/order.action';

const initialState = {
    order: null,
    addingOrder: false,
    addOrderError: null,
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
                    return item.foodId === action.orderLine.foodId;
                });
                index !== -1 ? order.orderLines.splice(index, 1) :
                    order.orderLines = [...order.orderLines, action.orderLine];
            }
            nextState = {
                ...state,
                order: order,
            };
            return nextState;
        default:
            return initialState;
    }
}
export default OrderReducer;
