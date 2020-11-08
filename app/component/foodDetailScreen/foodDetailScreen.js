/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { styles } from './foodDetailStyle';
import CustomButton from '../../shared/component/customButton';
import IconButton from '../../shared/component/iconButton';
import FoodAction from '../../actions/food.action';
import { OrderAction } from '../../actions/order.action';
import { FAVORITES } from '../../data/data';

class FoodDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.navigation.setOptions({title: props.route.params.food.name});
    }

    _onPress = () => {
        this.props.addToFavorite(this.props.route.params.food);
    }
    _addOrderLine = () => {
        const item = this.props.route.params.food;
        const orderLine = {
            quantity: 1,
            food: item,
            foodType: item.foodTypesDTO[0],
            supplements: [],
            ingredients: [],
        };
        this.props.addOrderLine(orderLine);
    }

    render() {
        const { food } = this.props.route.params;
        const order = this.props.order;
        const source = food.media[0] ? { uri: food.media[0] } : Images.fastfood;
        const { foodTypesDTO, ingredients, supplements } = food;
        const isFavorite = FAVORITES.findIndex(item => {
            return item.id === food.id;
        }) !== -1;
        const inOrderLines = order ? order.orderLines ? order.orderLines.findIndex(item => {
            return item.food.id === food.id;
        }) !== -1 : false : false;
        return (
            <ScrollView style={[styles.container]}  >
                <View style={styles.header} >
                    <Text style={[styles.title]} > {food.name} </Text>
                    <IconButton
                        style={styles.icon}
                        iconStyle={{ width: 30, height: 30 }}
                        onPress={this._onPress}
                        icon={isFavorite ? Images.heart_full : null}
                        shadowActive={false}
                    />
                </View>
                <View style={styles.imageContainer} >
                    <Image
                        source={source}
                        style={styles.image}
                        resizeMode={'contain'} />
                    <IconButton
                        style={styles.iconCard}
                        iconStyle={{ width: 50, height: 70 }}
                        onPress={this._addOrderLine}
                        icon={inOrderLines ? Images.remove_from_cart :  Images.add_to_cart}
                        shadowActive={true} />
                </View>
                <View style={styles.body} >
                    <Text style={[styles.text]} > {food.description} </Text>
                </View>
                <View style={styles.priceList} >
                    <Text style={styles.itemName}>Supplements: </Text>
                    {supplements.map((item) =>
                        <View style={styles.foodType} >
                            <CustomButton
                                title={item.name + ' ' + item.price + ' DT'}
                                // onPress={() => _onPress(item.name)}
                                style={{ padding: 2, width: 'auto' }}
                            />
                        </View>
                    )}
                </View>
                <View style={styles.priceList}  >
                    <Text style={styles.itemName}>Prices: </Text>
                    {foodTypesDTO.map((item) =>
                        <View style={styles.foodType} >
                            <CustomButton
                                title={item.type.id + ' ' + item.price + ' DT'}
                                // onPress={() => _onPress(item.name)}
                                style={{ padding: 2, width: 'auto' }}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.food.favorites,
        order: state.order.order,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToFavorite: (food) => dispatch({ type: FoodAction.addToFavoriteRequest, food }),
        addOrderLine: (orderLine) => dispatch({ type: OrderAction.addOrderLineRequest, orderLine }),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);
