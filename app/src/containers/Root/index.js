import React, {Component} from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import App from '../App'
import Login from '../../screens/Login'

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {INDEX} from '../../constants/screenPathnames'

export default class Root extends Component {
    render(){
        return (
            <Provider store={this.props.store}>
                <PersistGate loading={null} persistor={this.props.persistor}>
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path={INDEX} component={App}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
            
        )
    }
}