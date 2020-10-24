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

class FoodDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // change header title
        props.navigation.setOptions({ title: props.route.params.food.name });
        //console.log(props.route.params.food)
    }

    _onPress = () => {
        console.log('foodId: ', this.props.food.id);
    }

    render() {
        const { food } = this.props.route.params;
        const source = food.media[0] ? { uri: food.media[0] } : Images.fastfood;
        const { foodTypesDTO, ingredients, supplements } = food;
        return (
            <ScrollView style={[styles.container]}  >
                <View style={styles.header} >
                    <Text style={[styles.title]} > {food.name} </Text>
                    <IconButton
                        style={styles.icon}
                        iconStyle={{width: 30, height: 30}}
                    />
                </View>
                <View style={styles.imageContainer} >
                    <Image
                        source={source}
                        style={styles.image}
                        resizeMode={'contain'} />
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
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);
