/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Images from '../assets/images';
import CustomButton from '../shared/component/customButton';
import { connect } from 'react-redux';




class LauncherScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.token !== null ? ( console.log('navigate'), this.props.navigation.replace('Home')) : null;

    }
    _signIn = () => {
        this.props.navigation.navigate('Login');
    }
    _signUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={styles.constainer}>
                <ImageBackground
                    source={Images.launcherScreen}
                    style={styles.image}
                    resizeMode={'cover'}
                >
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title={'Sign in'}
                            onPress={this._signIn}
                        />
                        <CustomButton
                            title={'Sign up'}
                            onPress={this._signUp}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.login.authToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LauncherScreen);

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});
