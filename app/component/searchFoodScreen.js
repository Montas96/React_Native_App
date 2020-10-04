/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, TextInput, Dimensions, StyleSheet, View, Button, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { getRecip } from '../service/foodService';

class SearchFoodScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'chicken',
            data: {},
        };
    }
    componentDidMount() {
        this._search()
    }
    _search = () => {
        getRecip(this.state.text).then(data => this.setState({ data }));
    }
    _addToFavorite=(element)=> {
        const action = { type: 'ADD_To_FAVORITE', value: element };// create action type 'SET_USER_NAME'
        this.props.dispatch(action);
    }

    renderItem = ({ item }) => {
        const index = this.props.foods.findIndex(element => {
            return element.label === item.recipe.label;
        })
        const color = index !== -1  ? 'red' : 'black';
        return (
            <TouchableOpacity style={[styles.item, {borderColor: color}]}
                onPress={() => this.props.navigation.navigate('FoodDetail', { item })} >
                <Image style={[styles.image]} source={{ uri: item.recipe.image }} resizeMode={'contain'} />
                <View>
                    <Text style={styles.text} >{item.recipe.label}</Text>
                    <Text style={styles.label} >calories : {Math.round(item.recipe.calories)}</Text>
                    <Button
                        title="Add to favorite"
                        onPress={() => this._addToFavorite(item.recipe)}
                        color={'green'}
                        style={styles.button}
                    />
                </View>

            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.constainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        placeholder={'checken'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text} />
                    <Button
                        title="Search"
                        onPress={this._search}
                        color={'green'}
                        disabled={this.state.text === ''}
                        style={styles.button}
                    />
                </View>
                <View style={styles.dataContainer} >
                    <FlatList
                        data={this.state.data?.hits}
                        renderItem={item => this.renderItem(item)}
                    />
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        foods: state.food.foods,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFoodScreen);
const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        height: 50,
        alignSelf: 'center',
        borderWidth: 2,
    },
    button: {
        borderRadius: 42,
        width: Dimensions.get('screen').width * 0.5,
        height: 50,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dataContainer: {
        flex: 1,
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',

    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },


});
