/* eslint-disable prettier/prettier */
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
import {StatusBar, Button, Image, Text, View} from 'react-native';

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
import {Colors} from './app/assets/colors';
import SettingsScreen from './app/component/settings/settingsScreen';
import AboutUsScreen from './app/component/settings/aboutUsScreen';
import PrivacyPoliciesScreen from './app/component/settings/privacyPolicies';
import TermOfUseScreen from './app/component/settings/termOfUseScreen';
import CookiesPolicyScreen from './app/component/settings/cookiesPolicyScreen';
import FindUsScreen from './app/component/contactUsScreen.js/findUsScreen';
import ContactUsScreen from './app/component/contactUsScreen.js/contactUsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ordersListComponent from './app/component/orderScreen/ordersListComponent';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
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
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="FindUs" component={FindUsScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
    </Drawer.Navigator>
  );
};

const Home = ({navigation}) => {
  const Stack = createStackNavigator();
  const state = useSelector((state) => state);
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Food',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: 40,
          },
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
    </Stack.Navigator>
  );
};
const Favorites = ({navigation}) => {
  const Stack = createStackNavigator();
  const state = useSelector((state) => state);
  return (
    <Stack.Navigator initialRouteName="Favorite">
      <Stack.Screen name="Favorite" component={FavoriteFoodScreen} />
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
    </Stack.Navigator>
  );
};
const Settings = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesScreen} />
      <Stack.Screen name="TermsOfUse" component={TermOfUseScreen} />
      <Stack.Screen name="CookiesPolicy" component={CookiesPolicyScreen} />
    </Stack.Navigator>
  );
};
const ContactUs = () => {
  const Stack = createStackNavigator();
  const state = useSelector((state) => state);
  return (
    <Stack.Navigator initialRouteName="ContactUs">
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesScreen} />
      <Stack.Screen name="TermsOfUse" component={TermOfUseScreen} />
      <Stack.Screen name="CookiesPolicy" component={CookiesPolicyScreen} />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          title: 'Contact Us',
        }}
      />
    </Stack.Navigator>
  );
};
const Orders = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen name="Order" component={orderScreen} />
      <Stack.Screen name="Address" component={addressScreen} />
      <Stack.Screen name="Orders" component={ordersListComponent} />
    </Stack.Navigator>
  );
};
const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  const state = useSelector((state) => state);
  console.log(state.food?.favorites?.length);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showLabel: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={Images.food}
              style={{width: size, height: size, tintColor: color}}
              resizeMode={'contain'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Orders}
        options={{
          tabBarIcon: ({color, size}) => (
            <View>
              <Image
                source={Images.order}
                style={{width: size, height: size, tintColor: color}}
                resizeMode={'contain'}
              />
              {state.order.order?.orderLines?.length ? (
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: Colors.yellow,
                    borderRadius: 50,
                    width: 15,
                    height: 15,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {state.order.order?.orderLines?.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorites}
        options={{
          tabBarIcon: ({color, size}) => (
            <View>
              <Image
                source={Images.heart_blanc}
                style={{width: size, height: size, tintColor: color}}
                resizeMode={'contain'}
              />
              {state.food?.favorites?.length ? (
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: Colors.yellow,
                    borderRadius: 50,
                    width: 15,
                    height: 15,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {state.food?.favorites?.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={Images.settings}
              style={{width: size, height: size, tintColor: color}}
              resizeMode={'contain'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const HomeStack = ({navigation}) => {
//   const Stack = createStackNavigator();
//   const state = useSelector((state) => state);
//   return (
//     <Stack.Navigator initialRouteName="HomeStack">
//       <Stack.Screen
//         name="HomeStack"
//         component={HomeScreen}
//         options={{
//           title: 'Food',
//           headerTitleStyle: {
//             fontSize: 25,
//             fontWeight: 'bold',
//             textAlign: 'center',
//             marginLeft: 40,
//           },
//           headerShown: true,
//           headerRight: () => (
//             <IconButton
//               style={[
//                 {
//                   width: 40,
//                   height: 40,
//                   backgroundColor: state.order.order?.orderLines.length
//                     ? Colors.yellow
//                     : 'transparent',
//                 },
//               ]}
//               iconStyle={{width: 30, height: 30}}
//               onPress={() => navigation.navigate('Order')}
//               icon={Images.checklist}
//               shadowActive={false}
//             />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="FoodDetail"
//         component={FoodDetailScreen}
//         options={{
//           headerShown: true,
//           headerRight: () => (
//             <IconButton
//               style={[
//                 {
//                   width: 40,
//                   height: 40,
//                   backgroundColor: state.order.order?.orderLines.length
//                     ? Colors.yellow
//                     : 'transparent',
//                 },
//               ]}
//               iconStyle={{width: 30, height: 30}}
//               onPress={() => navigation.navigate('Order')}
//               icon={Images.checklist}
//               shadowActive={false}
//             />
//           ),
//         }}
//       />
//       <Stack.Screen name="Favorite" component={FavoriteFoodScreen} />
//       <Stack.Screen name="Order" component={orderScreen} />
//       <Stack.Screen name="Address" component={addressScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//       <Stack.Screen name="AboutUs" component={AboutUsScreen} />
//       <Stack.Screen name="PrivacyPolicies" component={PrivacyPoliciesScreen} />
//       <Stack.Screen name="TermsOfUse" component={TermOfUseScreen} />
//       <Stack.Screen name="CookiesPolicy" component={CookiesPolicyScreen} />
//       <Stack.Screen
//         name="FindUs"
//         component={FindUsScreen}
//         options={{
//           title: 'Find Us',
//         }}
//       />
//       <Stack.Screen
//         name="ContactUs"
//         component={ContactUsScreen}
//         options={{
//           title: 'Contact Us',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

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
