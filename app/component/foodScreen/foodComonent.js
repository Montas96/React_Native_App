/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import Images from '../../assets/images';
import { Styles } from '../../assets/styles';
class FoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // console.log(props)
  }

  render() {
      const {food} = this.props;
      const source = food.media[0] ? {uri: food.media[0]} : Images.fastfood;
      const price = food.foodTypesDTO.length && food.foodTypesDTO[0]?.price?.price ? food.foodTypesDTO[0]?.price?.price : null;
    return (
      <View style={[styles.container, Styles.shadow]}>
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
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    margin: 5,
  },
  image: {
      width: 150,
      height: 150,
      margin : 5,
  },
  body: {
      flex: 1,
      justifyContent: 'flex-start',
      margin: 5,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
  },
  text: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
  },
});
