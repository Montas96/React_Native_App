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
            supplementDTOS: [],
            ingredientsDTO:[],
        };
    }
    componentDidMount() {
        let listType = [];
        let listSupplement = [];
        let listIngredient = [];
        this.props.order.orderLines[this.props.index].food.foodTypesDTO.forEach(element => {
            if(this.props.order.orderLines[this.props.index].foodType){
                listType.push({ element, value: element.type.id === this.props.order.orderLines[this.props.index].foodType.type.id });
            }else {
                listType.push({ element, value: element.type.id === this.props.order.orderLines[this.props.index].food.foodTypesDTO[0].type.id });
            }
        });
        this.props.order.orderLines[this.props.index].food.supplements.forEach(element => {
            if (this.props.order.orderLines[this.props.index].supplements.length) {
                const index = this.props.order.orderLines[this.props.index].supplements.findIndex(item => {
                    return item.id === element.id;
                });
                if (index === -1) {
                    listSupplement.push({ element, value: false });
                } else {
                    listSupplement.push({ element, value: true });
                }
            } else {
                listSupplement.push({ element, value: false });

            }
        });
        this.props.order.orderLines[this.props.index].food.ingredients.forEach(element => {
            if (this.props.order.orderLines[this.props.index].ingredients.length) {
                const index = this.props.order.orderLines[this.props.index].ingredients.findIndex(item => {
                    return item.id === element.id;
                });
                if (index === -1) {
                    listIngredient.push({ element, value: false });
                } else {
                    listIngredient.push({ element, value: true });
                }
            } else {
                listIngredient.push({ element, value: false });

            }
        });
        this.setState({ foodTypesList: [listType], supplementDTOS: [listSupplement], ingredientsDTO: [listIngredient] });
    }
    _hideModal = () => {
        this.props.hideModal();
    }
    toggleCheckBox = (foodType, index) => {
        let foodTypesList = [...this.state.foodTypesList];
        let list = [];
        foodTypesList[index].forEach(element => {
            if (element.element.type.id === foodType.type.id) {
                list.push({element: element.element, value: true});
            } else {
                list.push({element: element.element, value: false});
            }
        });
        foodTypesList[index] = list;
        this.setState({ foodTypesList: foodTypesList });
    }
    toggleSupplementsCheckBox = (supplement, index, value) => {
        let supplementDTOS = [...this.state.supplementDTOS];
        let list = [];
        supplementDTOS[index].forEach(element => {
            if (element.element.id === supplement.id) {
                list.push({element:element.element  , value});
            } else {
                list.push({element: element.element , value: element.value});
            }
        });
        supplementDTOS[index] = list;
        this.setState({ supplementDTOS: supplementDTOS });
    }
    toggleIngredientCheckBox = (ingredient, index, value) => {
        let ingredientsDTO = [...this.state.ingredientsDTO];
        let list = [];
        ingredientsDTO[index].forEach(element => {
            if (element.element.id === ingredient.id) {
                list.push({element:element.element  , value});
            } else {
                list.push({element: element.element , value: element.value});
            }
        });
        ingredientsDTO[index] = list;
        this.setState({ ingredientsDTO });
    }
    _edit = () => {
        let order = { ...this.props.order };
        let orderLines = [...order.orderLines];
        orderLines.splice(this.props.index, 1);

        this.state.orderLines.forEach((item, index) => {
            let selectedFoodType;
            this.state.foodTypesList[index].forEach(element => {
                if (element.value) {
                    selectedFoodType = element.element;
                }
            });
            let supplementDTOS = [];
            this.state.supplementDTOS[index].forEach(element => {
                if (element.value) {
                    supplementDTOS.push(element.element);
                }
            });
            let ingredientsDTO = [];
            this.state.ingredientsDTO[index].forEach(element => {
                if (element.value) {
                    ingredientsDTO.push(element.element);
                }
            });
            orderLines.push({
                ...item,
                foodType: selectedFoodType,
                quantity: 1,
                supplements: supplementDTOS,
                ingredients: ingredientsDTO,
            });

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
        let supplementDTOS = [...this.state.supplementDTOS];
        supplementDTOS.push(this.state.supplementDTOS[0]);
        let ingredientsDTO = [...this.state.ingredientsDTO];
        ingredientsDTO.push(this.state.ingredientsDTO[0]);
        this.setState({ quantity: this.state.quantity + 1, orderLines: newOrderLines, foodTypesList, supplementDTOS, ingredientsDTO});
    }
    _minusQuantity = () => {
        if (this.state.quantity === 1) {
            return;
        }
        let orderLines = [...this.state.orderLines];
        orderLines.pop();
        let supplementDTOS = [...this.state.supplementDTOS];
        supplementDTOS.push();
        let foodTypesList = [...this.state.foodTypesList];
        foodTypesList.pop();
        let ingredientsDTO = [...this.state.ingredientsDTO];
        ingredientsDTO.pop();
        this.setState({ quantity: this.state.quantity - 1, orderLines, supplementDTOS, foodTypesList, ingredientsDTO });
    }

    RenderLine = ({ line, index }) => {
        const source = line.food?.media[0] ? { uri: line.food.media[0] } : Images.fastfood;
        const borderWidth = index > 0 ? 1 : 0;
        return (
            <View style={[styles.container, { borderTopWidth: borderWidth }]}>
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
                    <Text style={styles.name}>Ingredients: </Text>
                    {
                        this.state.ingredientsDTO.length ? this.state.ingredientsDTO[index].map(item => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Text style={[styles.name, { width: 100, flex: 1 }]}>{item.element.name}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={item.value}
                                    onValueChange={(newValue) => this.toggleIngredientCheckBox(item.element, index, newValue)}
                                />
                            </View>
                        )) : null
                    }
                    <Text style={styles.name}>Supplements: </Text>
                    {
                        this.state.supplementDTOS.length ? this.state.supplementDTOS[index].map(item => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Text style={[styles.name, { width: 100, flex: 1 }]}>{item.element.name}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={item.value}
                                    onValueChange={(newValue) => this.toggleSupplementsCheckBox(item.element, index, newValue)}
                                />
                                <Text style={[styles.name, { width: 100 }]}>{item.element.price + ' DT'}</Text>
                            </View>
                        )) : null
                    }
                </View>
            </View>
        );
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
