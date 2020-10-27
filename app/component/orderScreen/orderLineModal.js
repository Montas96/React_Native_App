/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import Images from '../../assets/images';
import { connect } from 'react-redux';
import { OrderAction } from '../../actions/order.action';
import Metrics from '../../assets/Metrics';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';

class OrderLineModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderLine: this.props.order.orderLines[props.index],
            foodTypesList: [],
        }
    }
    componentDidMount() {
        let list = [];
        this.props.order.orderLines[this.props.index].food.foodTypesDTO.forEach(element => {
            list.push({ element, value: element.type.id === this.props.order.orderLines[this.props.index].food.foodTypesDTO[0].type.id });
        });
        this.setState({ foodTypesList: list });
    }
    _hideModal = () => {
        this.props.hideModal();
    }
    toggleCheckBox = (foodType) => {
        let list = [];
        this.state.foodTypesList.forEach(element => {
            if (element.element.type.id === foodType.type.id) {
                list.push({ element: element.element, value: true });

            } else {
                list.push({ element: element.element, value: false });
            }
        });
        this.setState({ foodTypesList: list });
    }
    _edit = () => {
        let order = { ...this.props.order };
        let selectedFoodType;
        this.state.foodTypesList.forEach(element => {
            if (element.value) {
                selectedFoodType = element.element;
            }
        });
        order.orderLines[this.props.index].foodType = selectedFoodType;
        this.props.editOrder(order);
        this._hideModal();
    }

    render() {
        const { index, order, isVisible } = this.props;
        const source = food?.media[0] ? { uri: food.media[0] } : Images.fastfood;
        const currentOrderLine = order.orderLines[index];
        const { food } = currentOrderLine;

        return (
            <View>
                <Modal isVisible={isVisible} onBackdropPress={this._hideModal}>
                    <View style={styles.modal}>
                        <View style={styles.container}>
                            <Image source={source} style={styles.image} resizeMode={'contain'} />
                            <View style={styles.body}>
                                <View style={styles.quantity}>
                                    <Text style={styles.name}> {'quantity: ' + currentOrderLine.quantity} </Text>
                                </View>
                                <Text style={styles.name}>{food.name}</Text>
                                {
                                    this.state.foodTypesList.map(item => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[styles.name, { width: 100 }]}>{item.element.type.id}</Text>
                                            <CheckBox
                                                disabled={this.state.foodTypesList.length === 1}
                                                value={item.value}
                                                onValueChange={(newValue) => this.toggleCheckBox(item.element)}
                                            />
                                            <Text style={[styles.name, { width: 100 }]}>{item.element.price + ' DT'}</Text>

                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <Button
                            title={'save'}
                            onPress={this._edit}
                        />
                    </View>
                </Modal>
            </View>

        );
    }

};
const mapStateToProps = (state) => {
    return {
        order: state.order.order,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        editOrder: (order) => dispatch({ type: OrderAction.editOrder, order }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderLineModal);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        width: Metrics.width_full - 50,
        margin: 2,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 10,
        borderWidth: 1,
    },
    container: {
        flex: 1,
        width: Metrics.width_full - 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 2,

    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    body: {
        flex: 3,
    },
    quantity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'left',
    },
});
