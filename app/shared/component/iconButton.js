/* eslint-disable prettier/prettier */
import React from 'react';
import Metrics from '../../assets/Metrics';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Images from '../../assets/images';

const IconButton = ({ onPress, source, icon, style, iconStyle, disabled, shadowActive = true, text = null, textStyle = {} }) => {
  const styleButton = style ? style : {};
  const imageStyle = iconStyle ? iconStyle : {};
  const sourceImage = icon ? icon : source ? { uri: source } : Images.heart_blanc;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styleButton, shadowActive ? styles.shadow : {}]}>
      {text ? <Text style={[styles.text, textStyle]}> {text} </Text> : null}
      <Image
        source={sourceImage}
        style={[styles.image, imageStyle]}
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
    flexDirection: 'row',

  },
  image: {
    width: 35,
    height: 35,
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginHorizontal: 10
  }
});
