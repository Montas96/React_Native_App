/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, TextInput, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../shared/component/customButton';
import LoginActions from '../../actions/loginAction';
import Metrics from '../../assets/Metrics';
import Images from '../../assets/images';
import Card from '../../shared/component/card';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.navigation.replace('Home');
        }
    }

    _login = () => {
        this.props.attemptLogin(this.state.username, this.state.password);
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
                    {this.props.fetching ? <Card />
                        : <>
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
                        </>
                    }
                </View>
            </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        // backgroundColor: 'red',
        marginTop: Metrics.width_half_screen,
        marginHorizontal: Metrics.width_10,
        marginBottom: 100,
    },
    textConstainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputConstainer: {
        flex: 1,
        paddingVertical: Metrics.width_5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: Metrics.width_10,

    },
    inputStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#3D1706',
        height: 50,
        width: Metrics.width_full - Metrics.width_30,
        marginHorizontal: Metrics.width_22,
        padding: 15,
        marginVertical: Metrics.width_5,
        fontWeight: "600",
        fontSize: 20,
        backgroundColor: '#e7d798',
        color: '#3D1706',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
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
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'absolute',
        left: 0,
        top: 0,
        width: Metrics.width_full,
        height: Metrics.height_full,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: Metrics.width_5,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        borderRadius: 42,
        width: Dimensions.get('screen').width * 0.5,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },

});
