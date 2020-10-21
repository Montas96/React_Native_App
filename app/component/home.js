/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';


class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.loading();
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }
  componentDidUpdate() {
  }
  _onBackPress = () => {
    BackHandler.exitApp();
  }
  _logout = () => {
    this.props.logout();
    this.props.navigation.replace('Launcher');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }
  render() {
    return (
      <View style={styles.constainer}>
        <Text style={styles.title}> Food </Text>
        <View style={styles.button}>
          <Button
            title="Logout"
            onPress={this._logout}
            color={'green'}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      account: state.account.account,
      login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: ()=> dispatch({type: LoginActions.logoutRequest}),
    getAccount: ()=> dispatch({type: AccountActions.getAccountRequest}),
    loading: () =>  dispatch({type: LoginActions.loginLoad }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  list: {
    alignSelf: 'center',
    borderWidth: 2,
    padding: 20,
    margin: 20,
    borderColor: '#30aa',
  },
  listItem: {
    fontSize: 15,
    fontWeight: '800',
    color: 'gray',
    textAlign: 'left',
  },
  button: {
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
