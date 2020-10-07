/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View,  FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import {connect} from 'react-redux';
import Images from '../assets/images';

class FavotireFoodScreen extends React.Component {

    _addToFavorite = (element) => {
        const action = { type: 'ADD_To_FAVORITE', value: element };// create action type 'SET_USER_NAME'
        this.props.dispatch(action);
    }

    _renderItem = ({item}) => {
        const index = this.props.foods.findIndex((element) => {
          return element.label === item.label;
        });
        const color = index !== -1 ? 'red' : 'black';
        return (
          <TouchableOpacity
            style={[styles.item, {borderColor: color}]}
            onPress={() =>
              this.props.navigation.navigate('FoodDetail', {
                item: {recipe: item},
                isFavorite: color === 'red' ? true : false,
                add: this._addToFavorite,
              })
            }>
            <Image
              style={[styles.image]}
              source={{uri: item.image}}
              resizeMode={'contain'}
            />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.text}>{item.label}</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    margin: 10,
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={() => this._addToFavorite(item)}>
                  <Image
                    style={[styles.icon, {tintColor: color}]}
                    source={color === 'red' ? Images.heart_full : Images.heart_blanc}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>
                calories : {Math.round(item.calories)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      };

  render() {
    return (
      <View style={styles.constainer}>
        <FlatList
          data={this.props.foods}
          key={(item) => item.id}
          renderItem={(item) => this._renderItem(item)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    foods: state.food.favorite,
};
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavotireFoodScreen);

const styles = StyleSheet.create({
  constainer: {
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
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  list: {
    alignSelf: 'center',
    borderWidth: 2,
    padding: 20,
    margin: 20,
    borderColor: '#30aa',
  },
  listItem: {
    fontSize: 15,
    fontWeight: '800',
    color: 'gray',
    textAlign: 'left',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    padding: 5,
},
label: {
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 10,
},
});
