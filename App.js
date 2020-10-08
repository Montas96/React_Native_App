/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, View, Text, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Store from './app/store/configureStore';
import searchFoodScreen from './app/component/searchFoodScreen';
import FoodDetailScreen from './app/component/foodDetailScreen';
import FavotireFoodScreen from './app/component/favoriteFood';
import { PersistGate } from 'redux-persist/integration/react';
import AnimationScreen from './app/component/animationScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Food">
      <Stack.Screen name="Food" component={searchFoodScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
    </Stack.Navigator>
  );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props} >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}
const App: () => React$Node = () => {
  let persistor = Store.persistor;
  return (
    <>
      <Provider store={Store.store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Drawer.Navigator
              initialRouteName="Animation"
              drawerStyle={{marginTop: 50}}
              drawerContent={(props) => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="Animation" component={AnimationScreen} />
              <Drawer.Screen name="Food" component={HomeStack} />
              <Drawer.Screen name="Favorite" component={FavotireFoodScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
