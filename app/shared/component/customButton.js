/* eslint-disable prettier/prettier */
import React from 'react';
import Metrics from '../../assets/Metrics';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../assets/colors';

const CustomButton = ({ onPress, title, style, textStyle, disabled }) => {
  const styleButton = style ? style : {};
  const labelStyle = textStyle ? textStyle : {};
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, styleButton]}>
      <Text style={[styles.textStyle, labelStyle]}> {title} </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: Metrics.width_half_screen,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: Colors.yellow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '700',
  },
});
