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
import {PersistGate} from 'redux-persist/integration/react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Food">
      <Stack.Screen name="Food" component={searchFoodScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
    </Stack.Navigator>
  );
};
const App: () => React$Node = () => {
  let persistor = Store.persistor;
  return (
    <>
      <Provider store={Store.store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'search-circle' : 'search-circle-outline';
                  } else if (route.name === 'Favorite') {
                    iconName = focused ? 'list' : 'list';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Favorite" component={FavotireFoodScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
{
  /* <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Food" component={searchFoodScreen} />
              <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
              <Stack.Screen name="Favorite" component={FavotireFoodScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Form" component={FormScreen} />
            </Stack.Navigator> */
}
