/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Spinner() {
  return (
    <View>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  );
}
