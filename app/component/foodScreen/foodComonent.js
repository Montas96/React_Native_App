/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { styles } from './foodComponentStyle';
import { Colors } from '../../assets/colors';
import IconButton from '../../shared/component/iconButton';
import { OrderAction } from '../../actions/order.action';
class FoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress = () => {
    this.props.navigation.navigate('FoodDetail', { food: this.props.food });
  }
  _addOrderLine = () => {
    const item = this.props.food;
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
    const { food, isFavorite, order } = this.props;
    const source = food.media[0] ? { uri: food.media[0] } : Images.fastfood;
    const price = food.foodTypesDTO.length && food.foodTypesDTO[0]?.price ? food.foodTypesDTO[0]?.price : null;
    const borderColor = isFavorite ? 'red' : Colors.yellow;
    const inOrderLines = order ? order.orderLines ? order.orderLines.findIndex(item => {
      return item.food.id === food.id;
  }) !== -1 : false : false;
    return (
      <TouchableOpacity style={[styles.container,
      {
        borderWidth: 2,
        borderColor: borderColor,
      }]}
        onPress={this._onPress} >
        <View >
          <Image
            source={source}
            style={styles.image}
            resizeMode={'contain'} />
          <IconButton
            style={styles.icon}
            iconStyle={{ width: 30, height: 30 }}
            onPress={this._addOrderLine}
            icon={inOrderLines ? Images.remove_from_cart :  Images.add_to_cart}
            shadowActive={true} />
        </View>
        <View style={styles.body} >
          <Text style={[styles.title]} > {food.name} </Text>
          <Text style={[styles.text]} > {food.description} </Text>
          <Text style={[styles.title]} > {price ? price + ' DT' : ''} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addOrderLine: (orderLine) => dispatch({type: OrderAction.addOrderLineRequest, orderLine}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodScreen);
