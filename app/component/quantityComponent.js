/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Images from '../assets/images';

const QuantityComponent = ({quantity, plus, minus}) => {
  const _onAdd = () => {
    plus();
  };
  const _onRemove = () => {
    minus();
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}} >
      <TouchableOpacity style={{marginHorizontal: 5}} onPress={_onRemove}>
        <Image source={Images.minus} style={{width: 10, height: 10}} />
      </TouchableOpacity>
      <Text  style={{marginHorizontal: 5, borderWidth: 1, padding: 2}}> {quantity} </Text>
      <TouchableOpacity  style={{marginHorizontal: 5}} onPress={_onAdd}>
        <Image source={Images.plus} style={{width: 10, height: 10}} />
      </TouchableOpacity>
    </View>
  );
};
export default QuantityComponent;
