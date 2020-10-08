/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Images from '../assets/images';
import EnlargeShrink from '../assets/animations/EnlargeShrink';


const FoodDetailScreen = (props) => {

    const item = props.route.params.item;
    function _renderIngredientLine(element) {
        return (
            <Text style={[styles.ingredientLines, { textAlign: 'left' }]}> *  {element.item} </Text>
        );
    }
    const color = props.route.params.isFavorite ? 'red' : 'black';
    return (
        <View style={styles.constainer}>
            <Text style={styles.title}> {item.recipe.label} </Text>
            <Image style={[styles.image]} source={{ uri: item.recipe.image }} resizeMode={'contain'} />
            <TouchableOpacity
                style={{ justifyContent: 'center', margin: 10, alignSelf: 'center' }}
                onPress={() => {
                    props.route.params.add(item.recipe);
                    props.navigation.navigate('FoodDetail', { isFavorite: !props.route.params.isFavorite });
                }}>
                <EnlargeShrink
                    shouldEnlarge={props.route.params.isFavorite}>
                    <Image style={[styles.icon, { tintColor: color }]} source={color === 'red' ? Images.heart_full : Images.heart_blanc} resizeMode={'contain'} />
                </EnlargeShrink>
            </TouchableOpacity>
            <View style={styles.data} >
                <Text style={[styles.text, { textAlign: 'left' }]}> Ingredient : </Text>
                <FlatList
                    data={item.recipe.ingredientLines}
                    renderItem={element => _renderIngredientLine(element)}
                />

            </View>
        </View>

    );
};

export default FoodDetailScreen;
const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        backgroundColor: 'gray',

    },
    data: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    ingredientLines: {
        fontSize: 15,
        fontWeight: '200',
        textAlign: 'center',
        marginLeft: 20,
    },
    icon: {
        width: 32,
        height: 32,
    }
});