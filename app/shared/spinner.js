/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Spinner() {
  return (
    <View style={{position: 'absolute'}}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
}
