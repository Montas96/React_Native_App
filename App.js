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

import React, {useState} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './app/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import LauncherScreen from './app/component/launcherScreen';
import {createStackNavigator} from '@react-navigation/stack';
import loginScreen from './app/component/loginScreen/loginScreen';
import HomeScreen from './app/component/home';
import Spinner from './app/shared/spinner';
import Card from './app/shared/component/card';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const LauncherStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Launcher">
      <Stack.Screen
        name="Launcher"
        component={LauncherScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={loginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  let persistor = Store.persistor;
  const state = Store.store.getState();
  const [isLoaded, setIsLoaded] = useState(false);
  persistor.subscribe(() => setIsLoaded(true));
  return (
    <>
      <Provider store={Store.store}>
        <PersistGate persistor={persistor} loading={<Card />}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {isLoaded ? (
              state.login.isAuthenticated ? (
                HomeStack()
              ) : (
                LauncherStack(state.login.isAuthenticated)
              )
            ) : (
              <Card />
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
