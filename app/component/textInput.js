/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, View } from 'react-native';

const UselessTextInput = (props) => {
    const [value, onChangeText] = React.useState(props.userName);

    function _setSUsername (text) {
        props.setUserName(text);
    }

    return (
        <View style={{flex : 1, backgroundColor: 'gary', padding: 10}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 20 }}
                onChangeText={text => _setSUsername(text)}
                value={props.userName}
            />
        </View>

    );
};

export default UselessTextInput;