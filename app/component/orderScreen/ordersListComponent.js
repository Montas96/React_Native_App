/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { OrderAction } from '../../actions/order.action';
import { Styles } from '../../assets/styles';
import { localDateToJsDate } from '../../shared/utils/date-transforms';
import IconButton from '../../shared/component/iconButton';
import Images from '../../assets/images';

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
        this.props.getOrders({
            page: this.state.page,
            size: this.state.size,
        });
    }

    _onRefresh = () => {
        this.props.resetOrders();
        this.setState({ page: 0 },
            () => this._fetchOrders());
    }
    _cloneOrder = (item) => {
        let order = item;
        order.id = null;
        order.code = null;
        order.code = null;
        this.props.cloneOrder(order);
    }

    _renderEmpty = () => {
        return (
            <View style={{flex: 1}} >
              {this.props.fetchOrder ? null :  <Text  style={styles.title}> No order found </Text>}
            </View>
        );
    }

    _renderItem = (item) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderRadius: 5, margin: 5 }}>
                <Text style={styles.title} >{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.title} >{item.totalPrice + ' DT'}</Text>
                <IconButton
                    style={styles.icon}
                    iconStyle={{ width: 30, height: 30 }}
                    onPress={() => this._cloneOrder(item)}
                    icon={Images.copy}
                    shadowActive={false}
                    text={'Copy'}
                    textStyle={{fontSize: 15}} />
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
                    style={{ flex: 1, }}
                    ListEmptyComponent={this._renderEmpty}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fetchOrder: state.order.fetchClosedOrder,
        fetchOrderError: state.order.closedOrderError,
        validatedOrder: state.order.validatedOrder,
        links: state.order.orderLink,
        orders: state.order.orders,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        cloneOrder: (order) => dispatch({ type: OrderAction.editOrder, order }),
        getOrders: (options) => dispatch({ type: OrderAction.getClosedOrderRequest, options }),
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
    icon: {

    },
})
