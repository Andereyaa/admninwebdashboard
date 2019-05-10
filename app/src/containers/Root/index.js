import React, {Component} from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import App from '../App'

//Note to add multiple pages to the app, expand with React Router here
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