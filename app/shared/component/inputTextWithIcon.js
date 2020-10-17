/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import Metrics from '../../assets/Metrics';

export default function InputTextWithIcon({source, onChangeText, placeholder, isSecured, type}) {
    const [text, setText] = useState('');

    function validateEmail(email) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === 0) {
          return false;
        } else {
            return reg.test(email);
        }
      }
      function validatePassword(password) {
        const pattern = ['^.{8,}$', '(?=.*\\d)', '(?=.*[A-Z])'];
        if (!password.length){
            return false;
        }
        return pattern.map((rule) => new RegExp(rule, 'g')).map((condition) => condition.test(password));
      }

      function validate(text) {
        switch (type) {
            case 'EMAIL':
                return  validateEmail(text);
            case 'PASSWORD':
                return  validatePassword(text);
            default:
                return null;
        }
      }
    const isVerified = validate(text);
    const color =  type ? isVerified ? 'green' : 'red' : 'black';
    return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={[styles.inputStyle, {borderBottomColor: color}]}
        autoCapitalize={'none'}
        onChangeText={(text) => {
            setText(text);
            onChangeText( text, validate(text));
        }}
        secureTextEntry={isSecured ? isSecured : false}
      />
      <Image
        source={source}
        style={styles.icon}
        resizeMode={'contain'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Metrics.width_10,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 5,
    },
  inputStyle: {
    flex: 1,
    height:40,
    borderBottomWidth: 1,
    padding: 10,
    fontWeight: '600',
    fontSize: 20,
    color: '#3D1706',
  },
});
