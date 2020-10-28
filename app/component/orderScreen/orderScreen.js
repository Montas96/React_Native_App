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

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      orderLineIndex: null,
    }
  }
  componentDidMount() {
    this.props.getOrder('CREATED');
  }
  componentDidUpdate() {
    const { order, fetchOrder, fetchOrderError } = this.props;
  }

  _passOrder = () => {
    let order = { ...this.props.order };
    order.orderStatusId = 'VALIDATED';
    this.props.addOrder(order);
  }
  _renderEmpty = () => {
    return (
      <View>
        <Text> no order found </Text>
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

  render() {
    const { order } = this.props;
    const orderLines = order ? order.orderLines : [];
    return (
      <View style={styles.constainer}>
        {this.state.showModal ? <OrderLineModal index={this.state.orderLineIndex}
          isVisible={this.state.showModal}
          hideModal={() => this.setState({ showModal: false, orderLineIndex: null })}
        /> : null}

        <Text style={Styles.title}> Order </Text>
        <Text style={styles.title1}> Order Lines </Text>
        <FlatList
          data={orderLines}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <OrderLine orderLine={item} showModal={this._showModal} index={index} />}
          ListEmptyComponent={this._renderEmpty}
          ListFooterComponent={() => this._renderFooter(orderLines)}
        />
      </View>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (order) => dispatch({ type: OrderAction.addOrderRequest, order }),
    getOrder: (statusId) => dispatch({ type: OrderAction.getOrdersByStatusRequest, statusId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
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
});
