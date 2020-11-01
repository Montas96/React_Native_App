/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Styles } from '../../assets/styles';
import OrderLine from './orderLine';
import IconButton from '../../shared/component/iconButton';
import Images from '../../assets/images';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';
import { OrderAction } from '../../actions/order.action';
import OrderLineModal from './orderLineModal';
import OrderStatus from './orderStatusScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderListScreen from './ordersListComponent';
class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      orderLineIndex: null,
    };
    props.getOrder('CREATED');
  }
  componentDidMount() {
    // this.props.getOrder('CREATED');
  }
  componentDidUpdate() {
    const { order, fetchOrder, fetchOrderError } = this.props;
  }

  _passOrder = () => {
    let order = { ...this.props.order };
    order.orderStatusId = 'VALIDATED';
    this.props.navigation.navigate('Address', { order: order });
  }
  _save = () => {
    let order = { ...this.props.order };
    order.orderStatusId = 'CREATED';
    this.props.addOrder(order);
  }
  _reset = () => {
    this.props.resetOrder();
  }
  _renderEmpty = () => {
    return (
      <View style={{ flex: 1, margin: 20 }}>
        <Text> No order found </Text>
      </View>
    );
  };
  _renderFooter = (orderLines) => {
    let total = 0;
    orderLines.forEach(item => {
      let supplementsPrice = 0;
      if (item.supplements.length) {
        item.supplements.forEach(element => {
          supplementsPrice += element.price;
        });
      }
      total += item.quantity * (item.foodType.price + supplementsPrice);
    });
    let totalHT = total;
    total += total * 12 / 100;
    if (!orderLines.length) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title1}> {'Total HT: '} </Text>
          <Text style={styles.title1}> {totalHT + ' DT'} </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title1}> {'TVA: '} </Text>
          <Text style={styles.title1}> {'12%'} </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title1}> {'Total: '} </Text>
          <Text style={styles.title1}> {total + ' DT'} </Text>
        </View>
        <IconButton
          style={styles.icon}
          iconStyle={{ width: 30, height: 30 }}
          onPress={this._passOrder}
          icon={Images.checklist}
          shadowActive={true}
          text={'Order now'} />
      </View>
    );
  };

  _showModal = (index) => {
    this.setState({ showModal: true, orderLineIndex: index });
  }

  _order = () => {
    const { order, validatedOrder } = this.props;
    const orderLines = order ? order.orderLines : [];
    return (
      <View style={styles.constainer}>
        {validatedOrder ?
          <OrderStatus /> :
          <>
            {this.state.showModal ? <OrderLineModal index={this.state.orderLineIndex}
              isVisible={this.state.showModal}
              hideModal={() => this.setState({ showModal: false, orderLineIndex: null })}
            /> : null}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {order ? <IconButton
                style={styles.iconSave}
                iconStyle={{ width: 20, height: 20 }}
                onPress={this._reset}
                icon={Images.delete}
                shadowActive={false}
                text={null} /> : null}
              <Text style={Styles.title}> Order </Text>
              {order ? <IconButton
                style={styles.iconSave}
                iconStyle={{ width: 20, height: 20 }}
                onPress={this._save}
                icon={Images.save}
                shadowActive={false}
                text={null} /> : null}
            </View>
            <Text style={styles.title0}> Order Lines </Text>
            <FlatList
              data={orderLines}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => <OrderLine orderLine={item} showModal={this._showModal} index={index} />}
              ListEmptyComponent={this._renderEmpty}
              ListFooterComponent={() => this._renderFooter(orderLines)}
            />
          </>}
      </View>
    );
  }

  render() {
    const Tab = createMaterialTopTabNavigator();

    return (
      <Tab.Navigator initialRouteName={'Order'}>
        <Tab.Screen name="Order" component={this._order} />
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
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  title0: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: 10,
  },
  title1: {
    width: 100,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: 10,
  },
  footer: {
    flex: 1,
    marginVertical: 10,
  },
  icon: {
    flex: 1,
    // width: Metrics.width_15,
    height: Metrics.width_15,
    borderRadius: 5,
    margin: 15,
    // borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: Metrics.width_full - 30,
    backgroundColor: Colors.yellow,
  },
  iconSave: {
    flex: 1,
    height: Metrics.width_10,
    borderRadius: 5,
    margin: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    width: Metrics.width_full - 30,
    backgroundColor: 'transparent',
  },
});
