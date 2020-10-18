/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware} from 'redux';
import userReducer from '../reducer/userReducer';
import foodReducer from '../reducer/foodReducer';
import {persistCombineReducers, persistStore} from 'redux-persist';
import createAsyncStorage from 'redux-persist-react-native-async-storage';
import createSagaMiddeleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import loginReducer from '../reducer/loginReducer';
import accountReducer from '../reducer/accountReducer';

const storage = createAsyncStorage();
const sagaMiddeleware = createSagaMiddeleware();// Create instance of saga middleware

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};
const reducer = persistCombineReducers(rootPersistConfig, {
  user: userReducer,
  food: foodReducer,
  login: loginReducer,
  account: accountReducer,
});
const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(sagaMiddeleware));// Apply the saga middleware to redux
  const persistor = persistStore(store);
  sagaMiddeleware.run(rootSaga);

  return { persistor, store };
};

export default configureStore();
