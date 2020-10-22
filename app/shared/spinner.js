/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Spinner({style, color}) {
  const spinnerColor = color ? color : 'white';
  return (
    <View style={style}>
      <ActivityIndicator size={'large'} color={spinnerColor} />
    </View>
  );
}
