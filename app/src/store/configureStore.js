/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */

import developmentStore, {persistor as developmentPersistor} from './configureStore.dev'
import productionStore, {persistor as productionPersistor} from './configureStore.prod'

let loadedStore = null
let loadedPersistor = null

if (process.env.NODE_ENV === 'production') {
 loadedStore = productionStore
 loadedPersistor = developmentPersistor
} else {
 loadedStore = developmentStore
 loadedPersistor = productionPersistor
}

export const persistor = loadedPersistor
export const configureStore = loadedStore
