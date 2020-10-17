/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TextInput, ImageBackground, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../shared/component/customButton';
import LoginActions from '../../actions/loginAction';
import Images from '../../assets/images';
import Card from '../../shared/component/card';
import { styles } from './signupScreenStyle';
import InputTextWithIcon from './../../shared/component/inputTextWithIcon'
class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            mailStatus: false,
            passwordStatus: false,
        };
    }
    componentDidUpdate() {

    }

    _Signup = () => {
        this.props.attemptLogin(this.state.username, this.state.password);
    }

    _setLogin = (data) => {
        this.setState({ login: data });
    }
    _setEmail = (data, status) => {
        this.setState({ email: data, mailStatus:status });
    }
    _setPhone = (data) => {
        this.setState({ phone: data });
    }
    _setPassword = (data, status) => {
        this.setState({ password: data, passwordStatus: status });
    }
    _getEmailStatus = (data) => {
        this.setState({ mailStatus: data });
    }

    render() {
        const { mailStatus, passwordStatus } = this.state;
        const isDesabled =  !(mailStatus && passwordStatus);
        return <ScrollView style={{}}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.container} >
                <Image
                    source={Images.fastfood}
                    style={styles.image}
                    resizeMode={'cover'} />
                {this.props.fetching ? <Card />
                    : <>
                        <View
                            style={styles.inputContainer}>
                            <InputTextWithIcon
                                placeholder={'Login'}
                                source={Images.small_user_icon}
                                onChangeText={this._setLogin}
                            />
                            <InputTextWithIcon
                                placeholder={'Email'}
                                source={Images.mail_icon}
                                onChangeText={this._setEmail}
                                type={'EMAIL'}
                            />
                            <InputTextWithIcon
                                placeholder={'Phone'}
                                source={Images.phone_icon}
                                onChangeText={this._setPhone}
                            />
                            <InputTextWithIcon
                                placeholder={'Password'}
                                source={Images.password_icon}
                                onChangeText={this._setPassword}
                                isSecured={true}
                                type={'PASSWORD'}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <CustomButton
                                title={isDesabled ? 'Verify you information' : 'Create account'}
                                onPress={this._login}
                                disabled={isDesabled}
                            />
                        </View>
                    </>
                }
            </View>
        </ScrollView>;
    }
}
const mapStateToProps = (state) => {
    return {
        fetching: state.login.fetching,
        error: state.login.error,
        isAuthenticated: state.login.isAuthenticated,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (username, password) => dispatch({ type: LoginActions.loginRequest, value: { username, password } }),
        // logout: () => dispatch(LoginTypes.logoutRequest()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
