import React, {Component} from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import App from '../App'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {INDEX} from '../../constants/screenPathnames'

export default class Root extends Component {
    render(){
        return (
            <Provider store={this.props.store}>
                <PersistGate loading={null} persistor={this.props.persistor}>
                    <Router>
                        <Route path={INDEX} exact component={App}/>
                    </Router>
                </PersistGate>
            </Provider>
            
        )
    }
}