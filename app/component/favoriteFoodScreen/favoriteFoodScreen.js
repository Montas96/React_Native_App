/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FoodScreen from '../foodScreen/foodComonent';
import Spinner from '../../shared/spinner';
import { Colors } from '../../assets/colors';
import FoodAction from '../../actions/food.action';
import { styles } from './FavoriteFoodScreenStyle';


class FavoriteFoodScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0,
      size: 5,
    };
  }
  componentDidMount() {
    this.props.getFavoriteFood();
}
  componentDidUpdate() {
  }

  _fetchFavorite = () => {
    this.props.getFoods();
  }

  _renderEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center',backgroundColor: 'red'}} >
        {this.props.fetchingFoods ? <Spinner style={styles.spinner} color={Colors.yellow} /> : null}
      </View>
    );
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={styles.constainer}>
        <Text style={styles.title}> Favorite Food </Text>
        <FlatList
        key={item => item.id}
        data={this.props.favorites}
        renderItem={({item}) => <FoodScreen food={item} isFavorite={true} navigation={this.props.navigation} />}
         // add navigation props because foodScreen is not in the navigationStack
        ListEmptyComponent={this._renderEmpty}
        style={{flex: 1}}
        />

      </View>
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
    getFavoriteFood: () => dispatch({type: FoodAction.getAllFavoriteFoodRequest}),
    resetFavorite: () => dispatch({type: FoodAction.FavoriteFoodReset}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteFoodScreen);