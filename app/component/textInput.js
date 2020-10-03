/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, View } from 'react-native';

const UselessTextInput = () => {
    const [value, onChangeText] = React.useState('Useless Placeholder');

    return (
        <View style={{flex : 1, backgroundColor: 'gary', padding: 10}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 20 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
        </View>

    );
}

export default UselessTextInput;