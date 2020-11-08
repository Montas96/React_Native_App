/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Dimensions, BackHandler, FlatList } from 'react-native';
import { connect } from 'react-redux';
import LoginActions from '../actions/loginAction';
import AccountActions from '../actions/accountActions';
import CategoryActions from '../actions/category.action';
import CuisineAction from '../actions/cuisine.action';
import CustomList from './customList.component';
import FoodAction from '../actions/food.action';
import FoodScreen from './foodScreen/foodComonent';
import NotifService from '../shared/NotifService';
import DeviceAction from '../actions/device.action';
import { OrderAction } from '../actions/order.action';
import { CATEGORY, FOODS } from '../data/data';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageCategory: 0,
      pageCuisine: 0,
      pageFood: 0,
      size: 5,
    };
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  onRegister(token) {
    this.setState({registerToken: token, fcmRegistered: true});
  }

  _saveFcmToken = () => {
    let device = {
      fcmToken: this.state.registerToken.token,
      platform: this.state.registerToken.os,
      user: this.props.account.id,
    };
    !this.props.fetching && this.props.device?.id !== null && this.props.device?.fcmToken !== null &&  this.props.device?.user !== null ? null : this.props.saveDevice(device);
  }

  onNotif(notif) {
    if(notif.title){
      this.props.getOrder(notif.title);
    }
  }


    componentDidMount() {
      this.props.resetCategories();
      this.props.resetCuisines();
      this.props.resetFoods();
      this._fetchCategories();
      this._fetchCuisines();
      this._fetchFoods();
      BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }
    componentDidUpdate() {
      this.state.registerToken != null && !this.props.fetching ? this._saveFcmToken() : null;

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
    _fetchFoods = () => {
      this.props.getFoods({
        page: this.state.pageFood,
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

    _renderEmpty = () => {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
          {!this.props.fetchingFoods ? <Text>No foods please refresh</Text> : null}
        </View>
      );
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress');
    }

    _getIsFavorite = (food) => {
      return this.props.favorites.findIndex(item => {
        return item.id === food.id;
      }) !== -1;
    }

    _refresh = () => {
      this.props.resetFoods();
      this.setState({
        pageFood: 0,
      }, this._fetchFoods());
    }

    render() {

      return (
        <View style={styles.constainer}>
          <View style={styles.listContainer} >
            <CustomList navigation={this.props.navigation} list={CATEGORY}
              //fetching={this.props.fetchingCategories}
              // listTitle={'Categories'}
              />
          </View>
          <FlatList
            key={item => item.id}
            data={FOODS}
            renderItem={({ item }) => <FoodScreen food={item} navigation={this.props.navigation} isFavorite={this._getIsFavorite(item)} />}
            // add navigation props because foodScreen is not in the navigationStack
            //ListEmptyComponent={this._renderEmpty}
            style={{ flex: 1 }}
            //refreshing={this.props.fetchingFoods}
            //extraData={this.props.foods}
            //onRefresh={this._refresh}
          />

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
      foods: state.food.foods,
      fetchingFoods: state.food.fetchingAll,
      favorites: state.food.favorites,
      device: state.device.device,
      fetching: state.device.fetching,

    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch({ type: LoginActions.logoutRequest }),
      getAccount: () => dispatch({ type: AccountActions.getAccountRequest }),
      loading: () => dispatch({ type: LoginActions.loginLoad }),
      getCategories: (options) => dispatch({ type: CategoryActions.getAllCategoriesRequest, options }),
      getCuisines: (options) => dispatch({ type: CuisineAction.getAllCuisinesRequest, options }),
      resetCategories: () => dispatch({ type: CategoryActions.categoryReset }),
      resetCuisines: () => dispatch({ type: CuisineAction.cuisineReset }),
      getFoods: (options) => dispatch({ type: FoodAction.getAllFoodRequest, options }),
      resetFoods: () => dispatch({ type: FoodAction.FoodReset }),
      saveDevice:(device) => dispatch({type: DeviceAction.saveDeviceRequest, device}),
      getOrder: (statusId) =>
      dispatch({type: OrderAction.getOrdersByStatusRequest, statusId}),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
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
  listContainer: {
    // flex: 1,
  }
});
