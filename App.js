/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './app/component/home';
import AboutScreen from './app/component/aboutScreen';
import FormScreen from './app/component/form';
import {Provider} from 'react-redux';
import Store from './app/store/configureStore';
import searchFoodScreen from './app/component/searchFoodScreen';
import FoodDetailScreen from './app/component/foodDetailScreen';
import FavotireFoodScreen from './app/component/favoriteFood';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
           <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Food" component={searchFoodScreen} />
            <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
            <Stack.Screen name="Favorite" component={FavotireFoodScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
