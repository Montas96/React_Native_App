/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Images from '../../assets/images';
import { Styles } from '../../assets/styles';
import { styles } from './foodComponentStyle';
class FoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // console.log(props)
  }

  _onPress = () => {
    this.props.navigation.navigate('FoodDetail', {food: this.props.food});
  }

  render() {
      const {food} = this.props;
      const source = food.media[0] ? {uri: food.media[0]} : Images.fastfood;
      const price = food.foodTypesDTO.length && food.foodTypesDTO[0]?.price?.price ? food.foodTypesDTO[0]?.price?.price : null;
    return (
      <TouchableOpacity style={[styles.container, Styles.shadow]}
      onPress={this._onPress} >
          <View>
          <Image
          source={source}
          style={styles.image}
          resizeMode={'contain'} />
          </View>
          <View style={styles.body} >
              <Text style={[styles.title]} > {food.name} </Text>
              <Text style={[styles.text]} > {food.description} </Text>
              <Text style={[styles.title]} > {price ? price + ' DT' : ''} </Text>
          </View>

        <Text />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen);
