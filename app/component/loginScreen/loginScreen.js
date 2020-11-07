/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../shared/component/customButton';
import LoginActions from '../../actions/loginAction';
import Images from '../../assets/images';
import Card from '../../shared/component/card';
import { styles } from './loginScreenStyle';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    componentDidUpdate() {
        // if (this.props.token) {
        //     this.props.navigation.replace('Home');
        // }
    }

    _login = () => {
        // this.props.attemptLogin(this.state.username, this.state.password); // authenticate user
        this.props.navigation.replace('Home');
    }


    render() {
        return <ScrollView style={{}}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <ImageBackground
                source={Images.chef_backgroud}
                style={styles.image}
                resizeMode={'cover'}>
                <View style={styles.constainer} >
                    {/* {this.props.fetching ? <Card />
                        : <> */}
                            <View
                                style={styles.inputConstainer}>
                                <TextInput
                                    placeholder={'User name'}
                                    style={styles.inputStyle}
                                    autoCapitalize={'none'}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                                <TextInput
                                    placeholder={'Password'}
                                    style={styles.inputStyle}
                                    autoCapitalize={'none'}
                                    secureTextEntry={false}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    title={'Login'}
                                    onPress={this._login}
                                />
                            </View>
                        {/* </>
                    } */}
                </View>
            </ImageBackground>
        </ScrollView>;
    }
}
const mapStateToProps = (state) => {
    return {
        fetching: state.login.fetching,
        error: state.login.error,
        token: state.login.authToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (username, password) => dispatch({ type: LoginActions.loginRequest, value: { username, password } }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
