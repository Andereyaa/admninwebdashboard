import React, {Component} from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import App from '../App'

export default class Root extends Component {
    render(){
        const {store, persistor} = this.props
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
            
        )
    }
}