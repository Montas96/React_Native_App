/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { Styles } from '../../assets/styles';
import { styles } from './foodDetailStyle';
import CustomButton from '../../shared/component/customButton';
import IconButton from '../../shared/component/iconButton';
import FoodAction from '../../actions/food.action';

class FoodDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // change header title
        props.navigation.setOptions({ title: props.route.params.food.name });
        //console.log(props.route.params.food)
    }

    _onPress = () => {
        console.log('foodId: ', this.props.route.params.food.id);
        this.props.addToFavorite(this.props.route.params.food);
    }
    _addToCard = (item) => {
        console.log(item.id);
    }

    render() {
        const { food } = this.props.route.params;
        const source = food.media[0] ? { uri: food.media[0] } : Images.fastfood;
        const { foodTypesDTO, ingredients, supplements } = food;
        const isFavorite = this.props.favorites.findIndex(item => {
            console.log(item.id, food.id);
            return item.id === food.id;
        }) !== -1;
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
                        onPress={this._addToCard}
                        icon={Images.add_to_cart}
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

                <Text />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.food.favorites,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToFavorite: (food) => dispatch({ type: FoodAction.addToFavoriteRequest, food }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);
