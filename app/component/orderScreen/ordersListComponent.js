/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { OrderAction } from '../../actions/order.action';
import { Styles } from '../../assets/styles';
import { localDateToJsDate } from '../../shared/utils/date-transforms';

class OrderListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 10,
        };
    }

    componentDidMount() {
        this.props.resetOrders();
        this._fetchOrders();
    }
    componentDidUpdate() {

    }

    loadMore = () => {
        if (this.state.page < this.props.links.next || this.props.links.next === undefined || this.props.fetchOrder) {
            return;
        }
        this.setState({ page: this.state.page + 1 },
            () => this._fetchOrders());
    }

    _fetchOrders = () => {
        this.props.getOrders('CLOSED', {
            page: this.state.page,
            size: this.state.size,
        });
    }

    _onRefresh = () => {
        this.props.resetOrders();
        this.setState({ page: 0 },
            () => this._fetchOrders());
    }

    _renderItem = (item) => {
        console.log(item.code, item.date, item.totalPrice);
        return (
            <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, borderRadius: 5}}>
                <Text style={styles.title} >{item.code}</Text>
                {/* <Text style={styles.title} >{localDateToJsDate(item.date)}</Text> */}
                <Text style={styles.title} >{item.totalPrice + ' DT'}</Text>

            </View>
        );
    }

    render() {
        const { orders, fetchOrder } = this.props;
        return (
            <View style={styles.container}>
                <Text style={[Styles.title1]}  >Orders list</Text>
                <FlatList
                    data={orders}
                    key={item => item.id}
                    extraData={orders}
                    renderItem={({ item }) => this._renderItem(item)}
                    refreshing={fetchOrder}
                    refreshControl={<RefreshControl refreshing={fetchOrder} onRefresh={() => this._onRefresh()} />}
                    style={{flex: 1, }}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fetchOrder: state.order.fetchOrders,
        fetchOrderError: state.order.fetchOrderError,
        validatedOrder: state.order.validatedOrder,
        links: state.order.orderLink,
        orders: state.order.orders,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: (order) => dispatch({ type: OrderAction.addOrderRequest, order }),
        getOrders: (statusId, options) => dispatch({ type: OrderAction.getOrdersByStatusRequest, statusId, options }),
        resetOrders: () => dispatch({ type: OrderAction.resetOrders }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        margin: 10,
      },
})
