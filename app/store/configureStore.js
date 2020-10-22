/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from '../reducer/userReducer';
import foodReducer from '../reducer/foodReducer';
import {persistCombineReducers, persistStore, createMigrate, persistReducer} from 'redux-persist';
import createSagaMiddeleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import loginReducer from '../reducer/loginReducer';
import accountReducer from '../reducer/accountReducer';
import StartupReducer from '../reducer/startup.reducer';
import AppStateReducer from '../reducer/app-state.reducer';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import CategoryReducer from '../reducer/category.reducer';
import CuisineReducer from '../reducer/cuisine.reducer';

// const storage = createAsyncStorage();


const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
      login: undefined,
    };
  },
  1: (state) => {
    // migration to keep only device state
    return {
      login: state.login,
    }
  }
}

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1.0,
  //stateReconciler: autoMergeLevel2,
  migrate: (state) => {
    console.log('Migration Running!');
    return Promise.resolve(state);
  },
  whitelist: [
    'login','account',
  ],
  // migrate: createMigrate(migrations, { debug: false }),

};
// combine redicers
const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  food: foodReducer,
  account: accountReducer,
  appState: AppStateReducer,
  startup: StartupReducer,
  category: CategoryReducer,
  cuisine: CuisineReducer,
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
