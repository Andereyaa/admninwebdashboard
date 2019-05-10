import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore} from 'redux-persist'


const logger = createLogger()
const middleware = applyMiddleware(thunk, logger)
const store = createStore(
  rootReducer,
  undefined, 
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