import React, {Component} from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import App from '../App'

export default class Root extends Component {
    render(){
        return (
            <Provider store={this.props.store}>
                <PersistGate loading={null} persistor={this.props.persistor}>
                    <App />
                </PersistGate>
            </Provider>
            
        )
    }
}