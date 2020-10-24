/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../assets/images';
import { styles } from './foodComponentStyle';
import { Colors } from '../../assets/colors';
import IconButton from '../../shared/component/iconButton';
class FoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // console.log(props)
  }

  _onPress = () => {
    this.props.navigation.navigate('FoodDetail', { food: this.props.food });
  }
  _addToCard = (item) => {
    console.log(item.id);
  }

  render() {
    const { food, isFavorite } = this.props;
    const source = food.media[0] ? { uri: food.media[0] } : Images.fastfood;
    const price = food.foodTypesDTO.length && food.foodTypesDTO[0]?.price ? food.foodTypesDTO[0]?.price : null;
    const borderColor = isFavorite ? 'red' : Colors.yellow;
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
            onPress={this._addToCard}
            icon={Images.add_to_cart}
            shadowActive={true} />
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
