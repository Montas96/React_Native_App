/* eslint-disable no-labels */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';

class FormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    _setUserName = (text) => {
        this.setState({ userName: text });
    }
    _save = () => {
        const action = { type: 'SET_USER_NAME', value: this.state.userName };// create action type 'SET_USER_NAME'
        this.props.dispatch(action);
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.title}>Set User Detail </Text>
                <Text style={styles.text}>change state </Text>
                <View style={styles.form}>
                    <Text style={styles.label}>User name: </Text>
                    <TextInput
                        style={[styles.input, { height: 40, borderColor: 'gray', borderWidth: 1 }]}
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                        placeholder={'user name'}
                    />
                </View>
                <Button
                    title="Save"
                    onPress={this._save}
                    color={'green'}
                    disabled={this.state.userName === ''}
                    style={styles.button}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action); },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);

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
    form: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        alignSelf: 'center',
        marginRight: 10,
    },
    button: {
        borderRadius: 42,
        width: Dimensions.get('screen').width * 0.5,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
      },

});
