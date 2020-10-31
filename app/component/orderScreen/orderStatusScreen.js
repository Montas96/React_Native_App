/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, View, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';
import { OrderAction } from '../../actions/order.action';
import Images from '../../assets/images';

class OrderStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnimation: new Animated.Value(0),
            animate: false,
        };
    }
    componentDidMount() {
        this.startAnimation();
    }

    startAnimation() {
        Animated.sequence([
            Animated.timing(this.state.fadeAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.fadeAnimation, {
                toValue: 0.2,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
          this.startAnimation();
        });
      }


    render() {
        const { order } = this.props;
        const validated = order?.orderStatusId === 'VALIDATED';
        const inProgress = order?.orderStatusId === 'IN_PROGRESS';
        const delivering = order?.orderStatusId === 'DELIVERING';
        const delivered = order?.orderStatusId === 'DELIVERED';
        return (
            <View style={styles.constainer}>
                <Text style={styles.title1} >Current order Status</Text>
                <View style={{ alignSelf: 'center', margin: 10, flexDirection: 'row' }}>
                    <Animated.View style={{ borderRadius: 20, borderWidth: 1, padding: 5, borderColor: 'green', opacity: validated ? this.state.fadeAnimation : 1 }}>
                        <Image
                            source={Images.check}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={{ alignSelf: 'center', borderWidth: 1, width: 50, borderColor: 'green' }} />
                    <Animated.View style={{ borderRadius: 20, borderWidth: 1, padding: 5, borderColor: inProgress ? 'green' : 'black', opacity: inProgress ? this.state.fadeAnimation : 1 }}>
                        <Image
                            source={Images.cooking}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={{ alignSelf: 'center', borderWidth: 1, width: 50, borderColor: inProgress ? 'green' : 'black' }} />
                    <Animated.View style={{ borderRadius: 20, borderWidth: 1, padding: 5, borderColor: delivering ? 'green' : 'black', opacity: delivering ? this.state.fadeAnimation : 1 }}>
                        <Image
                            source={Images.delivery}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={{ alignSelf: 'center', borderWidth: 1, width: 50, borderColor: delivering ? 'green' : 'black' }} />
                    <Animated.View style={{ borderRadius: 20, borderWidth: 1, padding: 5, borderColor: delivered ? 'green' : 'black', opacity: delivered ? this.state.fadeAnimation : 1 }}>
                        <Image
                            source={Images.delivery_man}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        order: state.order.validatedOrder,
        fetchOrders: state.order.fetchOrders,
        fetchOrderError: state.order.fetchOrderError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOrder: (statusId) => dispatch({ type: OrderAction.getOrdersByStatusRequest, statusId }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);
const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        width: Metrics.width_full - 20,
        margin: 5,
        borderWidth: 1,
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    textInputCoordonation: {
        width: Metrics.width_60,
        margin: 5,
        borderWidth: 1,
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    title0: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 10,
        alignSelf: 'center',
    },
    title1: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        marginLeft: 10,
    },
    title2: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'left',
        marginLeft: 10,
        alignSelf: 'flex-start',
        margin: 10,
    },
    mapIcon: {
        flex: 1,
        width: Metrics.width_30,
        borderRadius: 5,
        margin: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.yellow,
    },
    icon: {
        flex: 1,
        height: Metrics.width_15,
        borderRadius: 5,
        margin: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        width: Metrics.width_full - 30,
        backgroundColor: Colors.yellow,
    },
});
