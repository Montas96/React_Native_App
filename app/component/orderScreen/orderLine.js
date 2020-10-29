/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Images from '../../assets/images';

const OrderLine = ({ orderLine, showModal, index }) => {
  const { food, supplements, ingredients } = orderLine;
  const source = food?.media[0] ? { uri: food.media[0] } : Images.fastfood;
  const _onPress = () => {
    showModal(index);
  };
  return (
    <TouchableOpacity style={styles.container}
      onPress={_onPress}>
      <Image source={source} style={styles.image} resizeMode={'contain'} />
      <View style={[styles.body]}>
        <View style={[{ flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
          <View style={{ flex: 3, }}>
            <Text style={styles.name}>{food.name}</Text>
            <Text style={styles.name}>{orderLine.foodType.type.id}</Text>
            {
              supplements.length ? supplements.map(element => (
                <Text style={styles.name}>{element.name}</Text>
              )) : null
            }
          </View>
          <View style={styles.quantity}>
            <Text style={styles.name}> {orderLine.quantity} </Text>
            <Text style={styles.name}> {orderLine.foodType.price + ' DT'} </Text>
            {
              supplements.length ? supplements.map(element => (
                <Text style={styles.name}>{element.price + ' DT'}</Text>
              )) : null
            }
          </View>
        </View>
        <View style={[{flex: 1, flexDirection: 'row' }]}>
          {
            ingredients.length ? ingredients.map(element => (
              <Text style={styles.ingredients}>{element.name + ', '}</Text>
            )) : null
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default OrderLine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    margin: 2,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  body: {
    flex: 2,
  },
  quantity: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  ingredients: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
  },
});
