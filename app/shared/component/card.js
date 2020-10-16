/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import Metrics from '../../assets/Metrics';

export default function Card({text}) {
    console.log('spinner')
    return (
        <View style={styles.constainer}>
            <ActivityIndicator size={'large'} color={'white'} />
            <Text style={styles.title} > {text ? text : 'loading'}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    constainer: {
        height: Metrics.width_third,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: '#e7d798',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
});

