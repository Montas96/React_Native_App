/* eslint-disable no-labels */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import UselessTextInput from './textInput';

export class FormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    _setUserName = (text) => {
        this.setState({userName: text});
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.title}>Form Screen </Text>
                <Text style={styles.text}>change state </Text>
                <TextInput
                style={[styles.input,{ height: 40, borderColor: 'gray', borderWidth: 1 }]}
                onChangeText={text => this.setState({userName: text})}
                value={this.state.userName}
                />
                <Text style={styles.text}> {this.state.userName} </Text>
                <UselessTextInput 
                userName={this.state.userName}
                setUserName={this._setUserName}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    constainer: {
    },
    title: {
        fontSize: 25,
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
    input: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },

});
