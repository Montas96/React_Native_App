/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import CategoryActions from '../actions/category.action';
import CuisineAction from '../actions/cuisine.action';
import CustomList from './customList.component';


class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageCategory: 0,
      pageCuisine: 0,
      size: 5,
    };
  }
  componentDidMount() {
    this.props.resetCategories();
    this.props.resetCuisines();
    this._fetchCategories();
    this._fetchCuisines();
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }
  componentDidUpdate() {
  }

  _fetchCategories = () => {
    this.props.getCategories({
      page: this.state.pageCategory,
      size: this.state.size,
    });
  }
  _fetchCuisines = () => {
    this.props.getCuisines({
      page: this.state.pageCuisine,
      size: this.state.size,
    });
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
        <CustomList navigation={this.props.navigation} list={this.props.categories}
        fetching={this.props.fetchingCategories} />
        <CustomList navigation={this.props.navigation} list={this.props.cuisines}
        fetching={this.props.fetchingCuisines} />

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      account: state.account.account,
      login: state.login,
      categories: state.category.categories,
      fetchingCategories: state.category.fetchingAll,
      cuisines: state.cuisine.cuisines,
      fetchingCuisines: state.category.fetchingAll,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: ()=> dispatch({type: LoginActions.logoutRequest}),
    getAccount: ()=> dispatch({type: AccountActions.getAccountRequest}),
    loading: () =>  dispatch({type: LoginActions.loginLoad }),
    getCategories: (options) => dispatch({type: CategoryActions.getAllCategoriesRequest, options}),
    getCuisines: (options) => dispatch({type: CuisineAction.getAllCuisinesRequest, options}),
    resetCategories: () => dispatch({type: CategoryActions.categoryReset}),
    resetCuisines: () => dispatch({type: CuisineAction.cuisineReset}),
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
