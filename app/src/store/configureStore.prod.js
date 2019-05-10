import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import {persistStore} from 'redux-persist'

const middleware = applyMiddleware(thunk)
const store = createStore(
  rootReducer, 
  undefined,
  middleware
)
export const persistor = persistStore(store)

export default function configureStore() {
  return store;
}