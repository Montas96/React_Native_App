/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';
import { OrderAction } from '../../actions/order.action';
import IconButton from '../../shared/component/iconButton';
import Images from '../../assets/images';
import Geolocation from '@react-native-community/geolocation';
import Alertfunction from '../../shared/component/customAlert';

class AddressScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            address: '',
            zipCode: '',
            alertVisiblity: false,
            alertMessage: '',
            accuracy: null,
            atitude: null,
            longitude: null,
            latitude: null,
            phone: '',
            alertType: null,
        };
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (prevProps.addingOrder && !this.props.addingOrder){
            this.setState({alertType: 'SUCCESS', alertVisiblity: true, alertMessage: 'Your order has been created. \n You will be notified ' });
        }
    }

    _passOrder = () => {
        let order = { ...this.props.order };
        order.orderStatusId = 'VALIDATED';
        order.deliveryAddress = {
            address: this.state.address,
            zipCode: this.state.zipCode,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            altitude: this.state.altitude,
            accuracy: this.state.accuracy,
            phone: this.state.phone,
        };
        this.props.addOrder(order);
    }

    _getPosition = () => {
        Geolocation.getCurrentPosition(info => this._setCoordonations(info), error => this._showModal(error.code));
    }

    _setCoordonations = ({ coords }) => {
        this.setState({ accuracy: coords.accuracy, latitude: coords.latitude, longitude: coords.longitude, atitude: coords.atitude })
    }

    _showModal = (code) => {
        if (code === 2) {
            this.setState({alertType: 'ERROR', alertVisiblity: true, alertMessage: 'Geolocalisation is required please activated' });
        }
    }
    _dissmiss = () => {
        this.setState({ alertVisiblity: false });
        if (this.state.alertType === 'SUCCESS'){
            this.props.navigation.replace('Order');
        }
    }

    render() {
        const { order } = this.props.route.params;
        const { address, zipCode, latitude, longitude, phone, alertType } = this.state;
        const disabled = (address && zipCode && phone) || (latitude && longitude && phone);

        return (
            <ScrollView style={styles.constainer}>
                <Alertfunction
                    Title={alertType}
                    Type={alertType}
                    Body={this.state.alertMessage}
                    Visible={this.state.alertVisiblity}
                    OkButtonAction={this._dissmiss}
                    onDismissAction={this._dissmiss}
                    CancelButtonAction={null}
                />
                <Text style={styles.title0}> Delevery Address </Text>
                <View style={styles.body} >
                    <TextInput
                        value={this.state.address}
                        placeholder={'Address'}
                        onChangeText={(text) => this.setState({ address: text })}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={this.state.zipCode}
                        placeholder={'Zip code'}
                        textContentType={'postalCode'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.setState({ zipCode: text })}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={this.state.phone}
                        placeholder={'Phone'}
                        textContentType={'telephoneNumber'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.setState({ phone: text })}
                        style={styles.textInput}
                    />
                    <Text style={styles.title2}> My Coordonation </Text>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 2 }}>
                            <Text style={styles.textInputCoordonation} >{this.state.latitude ? this.state.latitude : 'latitude'}</Text>
                            <Text style={styles.textInputCoordonation} >{this.state.longitude ? this.state.longitude : 'longitude'}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <IconButton
                                style={styles.mapIcon}
                                iconStyle={{ width: 30, height: 30 }}
                                onPress={this._getPosition}
                                icon={Images.map_position}
                                shadowActive={false}
                                text={null} />
                        </View>
                    </View>
                    <IconButton
                        disabled={!disabled}
                        style={[styles.icon, { backgroundColor: !disabled ? Colors.white_gray : Colors.yellow }]}
                        iconStyle={{ width: 30, height: 30 }}
                        onPress={this._passOrder}
                        icon={Images.checklist}
                        shadowActive={true}
                        text={'VALIDATE'} />
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        order: state.order.order,
        addingOrder: state.order.addingOrder,
        addOrderError: state.order.addOrderError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: (order) => dispatch({ type: OrderAction.addOrderRequest, order }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);
const styles = StyleSheet.create({
    constainer: {
        flex: 1,
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
        width: 100,
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
