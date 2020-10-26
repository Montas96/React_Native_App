/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Images from '../../assets/images';

const OrderLine = ({order}) => {
  const {food} = order;
  const source = food?.media[0] ? {uri: food.media[0]} : Images.fastfood;

  // console.log(food);
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} resizeMode={'contain'} />
      <View style={styles.body}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.name}>{order.foodType.type.id}</Text>
      </View>
      <View style={styles.quantity}>
        <Text style={styles.name}> {order.quantity} </Text>
        <Text style={styles.name}> {order.foodType.price + ' DT'} </Text>
      </View>
    </View>
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
});
