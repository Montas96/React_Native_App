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
        console.log( order?.orderStatusId)
        const validated = order?.orderStatusId === 'VALIDATED';
        const inProgress = order?.orderStatusId === 'IN_PROGRESS';
        const delivering = order?.orderStatusId === 'DELIVERING';
        const delivered = order?.orderStatusId === 'DELIVERED';
        return (
            <View style={styles.constainer}>
                <Text style={styles.title0} >Current order Status</Text>
                <View style={styles.body}>
                    <Animated.View style={[styles.animatedView, { borderColor: 'green', opacity: validated ? this.state.fadeAnimation : 1 }]}>
                        <Image
                            source={Images.check}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={[styles.line, { borderColor: 'green' }]} />
                    <Animated.View style={[styles.animatedView, { borderColor: inProgress ? 'green' : 'black', opacity: inProgress ? this.state.fadeAnimation : 1 }]}>
                        <Image
                            source={Images.cooking}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={[styles.line, { borderColor: inProgress ? 'green' : 'black' }]} />
                    <Animated.View style={[styles.animatedView, { borderColor: delivering ? 'green' : 'black', opacity: delivering ? this.state.fadeAnimation : 1 }]}>
                        <Image
                            source={Images.delivery}
                            style={{ width: 20, height: 20 }}
                        />
                    </Animated.View>
                    <View style={[styles.line, { borderColor: delivering ? 'green' : 'black' }]} />
                    <Animated.View style={[styles.animatedView, { borderColor: delivered ? 'green' : 'black', opacity: delivered ? this.state.fadeAnimation : 1 }]}>
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
        backgroundColor: 'white',
    },
    body: {
        alignSelf: 'center',
        margin: 10,
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 1,
        padding: 20,
        backgroundColor: Colors.white_gray,
    },

    title0: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 10,
        alignSelf: 'center',
    },
    animatedView: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 5,
    },
    line: {
        alignSelf: 'center',
        borderWidth: 1,
        width: 50,
    },
});
