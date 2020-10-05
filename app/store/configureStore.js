/* eslint-disable prettier/prettier */
import {createStore} from 'redux';
import userReducer from '../reducer/userReducer';
import foodReducer from '../reducer/foodReducer';
import {persistCombineReducers, persistStore} from 'redux-persist';
import createAsyncStorage from 'redux-persist-react-native-async-storage';

const storage = createAsyncStorage();

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};
const reducer = persistCombineReducers(rootPersistConfig, {
  user: userReducer,
  food: foodReducer,
});
const configureStore = () => {
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
};
export default configureStore();
