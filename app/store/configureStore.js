/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from '../reducer/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddeleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import loginReducer from '../reducer/loginReducer';
import accountReducer from '../reducer/accountReducer';
import StartupReducer from '../reducer/startup.reducer';
import AppStateReducer from '../reducer/app-state.reducer';
import AsyncStorage from '@react-native-community/async-storage';
import CategoryReducer from '../reducer/category.reducer';
import CuisineReducer from '../reducer/cuisine.reducer';
import FoodReducer from '../reducer/food.reducer';
import OrderReducer from '../reducer/order.reducer';
import DeviceReducer from '../reducer/device.reducer';
// const storage = createAsyncStorage();


const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1.0,
  migrate: (state) => {
    console.log('Migration Running!');
    return Promise.resolve(state);
  },
  whitelist: [
    'login','account','order',
  ],
};
// combine redicers
const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  account: accountReducer,
  appState: AppStateReducer,
  startup: StartupReducer,
  category: CategoryReducer,
  cuisine: CuisineReducer,
  food: FoodReducer,
  order: OrderReducer,
  device: DeviceReducer,
});
const configureStore = () => {
  console.log('1-configure store');
  const sagaMiddeleware = createSagaMiddeleware();// Create instance of saga middleware
  const persistedReducer = persistReducer(rootPersistConfig, reducer);
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddeleware));// Apply the saga middleware to redux
  const startup = () => store.dispatch({type: 'START_UP'});

  const persistor = persistStore(store,null, startup);// run startup after finish rehydration
  sagaMiddeleware.run(rootSaga);

  return { persistor, store };
};

export default configureStore();
