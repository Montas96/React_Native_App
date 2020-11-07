/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../shared/component/customButton';
import Images from '../../assets/images';
import Card from '../../shared/component/card';
import { styles } from './signupScreenStyle';
import InputTextWithIcon from './../../shared/component/inputTextWithIcon'
import AccountActions from '../../actions/accountActions';
import Alertfunction from '../../shared/component/customAlert';
import LoginActions from '../../actions/loginAction';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            phone: '',
            password: '',
            mailStatus: false,
            passwordStatus: false,
            alertVisiblity: false,
            alertType: null,
            alertMessage: '',
        };
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.fetching && !this.props.fetching) {
        //     this.props.error ? this._showDialog('ERROR', this.props.error) : null;// display error Alert when an error occure
        //     this.props.success ? this._navigateToSuccessScreen() : null;// navigate to success screen
        // }
    }

    // on ok button press
    _onOk = () => {
        this.setState({ alertVisiblity: false });
    }
    // on cancel button press
    _onCancel = () => {
        this.setState({ alertVisiblity: false }, () => this.props.navigation.goBack());
    }

    // Show Custom alert
    _showDialog = (type, message) => {
        this.setState({ alertVisiblity: true, alertType: type, alertMessage: message });
    }

    // get login input text
    _setLogin = (data) => {
        this.setState({ login: data });
    }
    _setEmail = (data, status) => {
        this.setState({ email: data, mailStatus: status });
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

    _Signup = () => {
        const user = {
            login: this.state.login,
            firstname: this.state.login,
            email: this.state.email,
            password: this.state.password,
            b2CUserDTO: {
                phone: this.state.phone,
            },
        };
        // this.props.signup(user);
        this._navigateToSuccessScreen()
    }
    _navigateToSuccessScreen = () => {
        // authenticate user after success, we can do this in account sagas
        //this.props.attemptLogin(this.state.email, this.state.password);
        this.props.navigation.replace('SignUpSuccess');
    }

    render() {
        const { mailStatus, passwordStatus } = this.state;
        const isDesabled = !(mailStatus && passwordStatus);
        return <ScrollView style={{}}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <Alertfunction
                Title={this.state.alertType}
                Type={this.state.alertType}
                Body={this.state.alertMessage}
                Visible={this.state.alertVisiblity}
                OkButtonAction={this._onOk}
                onDismissAction={this._onOk}
                CancelButtonAction={this._onCancel}
            />
            <View style={styles.container} >
                <Image
                    source={Images.fastfood}
                    style={styles.image}
                    resizeMode={'cover'} />
                {/* {this.props.fetching ? <Card />
                    : <> */}
                        <View
                            style={styles.inputContainer}>
                            <InputTextWithIcon
                                placeholder={'Name'}
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
                                onPress={this._Signup}
                                disabled={false}
                            />
                        </View>
                    {/* </>
                } */}
            </View>
        </ScrollView>;
    }
}
const mapStateToProps = (state) => {
    return {
        fetching: state.account.fetching,
        error: state.account.error,
        success: state.account.registerSuccess,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        //signup: (user) => dispatch({ type: AccountActions.signupRequest, user: user }),
        //attemptLogin: (username, password) => dispatch({ type: LoginActions.loginRequest, value: { username, password, rememberMe: true } }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
