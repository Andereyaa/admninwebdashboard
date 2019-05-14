import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const logger = createLogger()
const middleware = applyMiddleware(thunk, logger)

const persistConfig = {
  key: 'root',
  storage,
  timeout: null
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  middleware
)

export const persistor = persistStore(store)

export default function configureStore() {
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
  }
  return store;
}