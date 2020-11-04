/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Spinner({style, color, visible = true}) {
  const spinnerColor = color ? color : 'white';
  return (
    <View style={visible ? style : {}}>
     {visible ?  <ActivityIndicator size={'large'} color={spinnerColor} /> : null}
    </View>
  );
}
