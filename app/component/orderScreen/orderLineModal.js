/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import Images from '../../assets/images';
import { connect } from 'react-redux';
import { OrderAction } from '../../actions/order.action';
import Metrics from '../../assets/Metrics';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import QuantityComponent from '../quantityComponent';

class OrderLineModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderLines: [this.props.order.orderLines[props.index]],
            foodTypesList: [],
            quantity: this.props.order.orderLines[props.index].quantity,
            newOrderLines: [],
        };
    }
    componentDidMount() {
        let list = [];
        this.props.order.orderLines[this.props.index].food.foodTypesDTO.forEach(element => {
            list.push({ element, value: element.type.id === this.props.order.orderLines[this.props.index].food.foodTypesDTO[0].type.id });
        });
        this.setState({ foodTypesList: [list] });
    }
    _hideModal = () => {
        this.props.hideModal();
    }
    toggleCheckBox = (foodType, index) => {
        let foodTypesList = [...this.state.foodTypesList];
        let list = [];
        foodTypesList[index].forEach(element => {
            if (element.element.type.id === foodType.type.id) {
                list.push({ element: element.element, value: true });
            } else {
                list.push({ element: element.element, value: false });
            }
        });
        foodTypesList[index] = list;
        this.setState({ foodTypesList: foodTypesList });
    }
    _edit = () => {
        let order = { ...this.props.order };
        let orderLines = [...order.orderLines];
        orderLines.splice(this.props.index,1);

        this.state.orderLines.forEach( (item, index) => {
            let selectedFoodType;
            this.state.foodTypesList[index].forEach(element => {
                if (element.value) {
                    selectedFoodType = element.element;
                }
            });
            orderLines.push({
               ...item,
               foodType: selectedFoodType,
               quantity: 1
            })
            // orderLines[index] = item;
            // orderLines[index].foodType = selectedFoodType;
            // orderLines[index].quantity = 1;
        });

        order.orderLines = orderLines;
        this.props.editOrder(order);
        this._hideModal();
    }
    _plusQuantity = () => {
        let newOrderLines = [...this.state.orderLines];
        newOrderLines.push(this.state.orderLines[0]);
        let foodTypesList = [...this.state.foodTypesList];
        foodTypesList.push(this.state.foodTypesList[0]);
        this.setState({ quantity: this.state.quantity + 1, orderLines: newOrderLines, foodTypesList });
    }
    _minusQuantity = () => {
        let orderLines = [...this.state.orderLines];
        orderLines.pop();
        this.state.quantity === 1 ? null : this.setState({ quantity: this.state.quantity - 1,orderLines });
    }

    RenderLine = ({ line, index }) => {
        const source = line.food?.media[0] ? { uri: line.food.media[0] } : Images.fastfood;
        const borderWidth = index > 0 ? 1 : 0;
        return (
            <View style={[styles.container,{borderTopWidth: borderWidth}]}>
                <Image source={source} style={styles.image} resizeMode={'contain'} />
                <View style={styles.body}>

                    <Text style={styles.name}>{line.food.name}</Text>
                    {
                        this.state.foodTypesList.length ? this.state.foodTypesList[index].map(item => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.name, { width: 100 }]}>{item.element.type.id}</Text>
                                <CheckBox
                                    disabled={this.state.foodTypesList[index].length === 1}
                                    value={item.value}
                                    onValueChange={(newValue) => this.toggleCheckBox(item.element, index)}
                                />
                                <Text style={[styles.name, { width: 100 }]}>{item.element.price + ' DT'}</Text>

                            </View>
                        )) : null
                    }
                </View>
            </View>
        )
    }

    render() {
        const { isVisible } = this.props;

        return (
            <View>
                <Modal isVisible={isVisible} onBackdropPress={this._hideModal}>
                    <View style={styles.modal}>
                        <View style={styles.quantity}>
                            <Text style={styles.name}> {'Quantity: '} </Text>
                            <QuantityComponent
                                quantity={this.state.quantity}
                                plus={this._plusQuantity}
                                minus={this._minusQuantity}
                            />
                        </View>
                        {
                            this.state.orderLines.map((line, index) => (
                                <this.RenderLine line={line} index={index} />
                            ))
                        }
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
        padding: 5,
        flexDirection: 'row'
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'left',
    },
});
