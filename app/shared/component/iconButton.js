/* eslint-disable prettier/prettier */
import React from 'react';
import Metrics from '../../assets/Metrics';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../assets/colors';
import Images from '../../assets/images';

const IconButton = ({ onPress, source, icon, style, iconStyle, disabled }) => {
  const styleButton = style ? style : {};
  const imageStyle = iconStyle ? iconStyle : {};
  const sourceImage = icon ? icon : source ? {uri: source} : Images.heart_blanc;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styleButton]}>
          <Image
          source={sourceImage}
          style={[styles.image,imageStyle]}
          resizeMode={'contain'}
          />
    </TouchableOpacity>
  );
};
export default IconButton;
const styles = StyleSheet.create({
  button: {
    width: Metrics.width_half_screen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  image: {
    width: 35,
    height: 35,
  },
});
