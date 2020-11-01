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
import {StatusBar, Button, Image, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from './app/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import LauncherScreen from './app/component/launcherScreen';
import {createStackNavigator} from '@react-navigation/stack';
import loginScreen from './app/component/loginScreen/loginScreen';
import HomeScreen from './app/component/home';
import signupSuccessScreen from './app/component/signup/signupSuccessScreen';
import Card from './app/shared/component/card';
import signupScreen from './app/component/signup/signupScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import LoginActions from './app/actions/loginAction';
import FoodDetailScreen from './app/component/foodDetailScreen/foodDetailScreen';
import FavoriteFoodScreen from './app/component/favoriteFoodScreen/favoriteFoodScreen';
import orderScreen from './app/component/orderScreen/orderScreen';
import addressScreen from './app/component/orderScreen/addressScreen';
import IconButton from './app/shared/component/iconButton';
import Images from './app/assets/images';
import {select} from 'redux-saga/effects';
import {Colors} from './app/assets/colors';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="Favorite"
        onPress={() => props.navigation.navigate('Favorite')}
      />
      <DrawerItem
        label="Order"
        onPress={() => props.navigation.navigate('Order')}
      />
      <Button
        title={'Logout'}
        onPress={() => {
          dispatch({type: LoginActions.logoutRequest});
          props.navigation.navigate('Launcher');
        }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerStack = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
};

const HomeStack = ({navigation}) => {
  const Stack = createStackNavigator();
  const state = useSelector((state) => state);
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{
          headerShown: true,
          headerRight: () => (
            <IconButton
              style={[
                {
                  width: 40,
                  height: 40,
                  backgroundColor: state.order.order?.orderLines.length
                    ? Colors.yellow
                    : 'transparent',
                },
              ]}
              iconStyle={{width: 30, height: 30}}
              onPress={() => navigation.navigate('Order')}
              icon={Images.checklist}
              shadowActive={false}
            />
          ),
        }}
      />
      <Stack.Screen name="Favorite" component={FavoriteFoodScreen} />
      <Stack.Screen name="Order" component={orderScreen} />
      <Stack.Screen name="Address" component={addressScreen} />
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
        name="SignUp"
        component={signupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpSuccess"
        component={signupSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={DrawerStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  let persistor = Store.persistor;
  const state = Store.store.getState();
  const [isLoaded, setIsLoaded] = useState(true);
  persistor.subscribe(() => {
    setIsLoaded(true);
  });

  return (
    <>
      <Provider store={Store.store}>
        <PersistGate persistor={persistor} loading={<Card />}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {isLoaded ? (
              state.login.authToken ? (
                DrawerStack()
              ) : (
                LauncherStack()
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
