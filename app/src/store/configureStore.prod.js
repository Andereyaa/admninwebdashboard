import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middleware = applyMiddleware(thunk)

const persistConfig = {
  key: 'root',
  storage,
  timeout: null
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  undefined,
  middleware
)

export const persistor = persistStore(store)

export default function configureStore() {
  return store;
}