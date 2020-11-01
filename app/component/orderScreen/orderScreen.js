/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';
import { OrderAction } from '../../actions/order.action';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderListScreen from './ordersListComponent';
import Order from './Order';

class OrderScreen extends React.Component {

  render() {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator initialRouteName={'Order'}>
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen name="Closed" component={OrderListScreen} />
      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    addingOrder: state.order.addingOrder,
    addOrderError: state.order.addOrderError,
    fetchOrder: state.order.fetchOrders,
    fetchOrderError: state.order.fetchOrderError,
    validatedOrder: state.order.validatedOrder,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (order) => dispatch({ type: OrderAction.addOrderRequest, order }),
    getOrder: (statusId) => dispatch({ type: OrderAction.getOrdersByStatusRequest, statusId }),
    resetOrder: () => dispatch({ type: OrderAction.resetOrder }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);