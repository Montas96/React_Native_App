/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const FoodDetailScreen = (props) => {

    const item = props.route.params.item;
    function _renderIngredientLine(element) {
        return (
            <Text style={[styles.ingredientLines, { textAlign: 'left' }]}> *  {element.item} </Text>
        )
    }

    return (
        <View style={styles.constainer}>
            <Text style={styles.title}> {item.recipe.label} </Text>
            <Image style={[styles.image]} source={{ uri: item.recipe.image }} resizeMode={'contain'} />
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
    }
});