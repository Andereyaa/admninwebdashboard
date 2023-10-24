import React, {Component, Fragment} from 'react';
import Main from '../Main'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import {countryList} from "../../data/countries"

import Login from '../../screens/Login'
import LoadingScreen from '../../components/LoadingScreen'

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {INDEX} from '../../constants/screenPathnames'

import {logError} from '../../utils/errorHandling'
import {configureScope} from '../../config/sentry'
import {version} from '../../config/release'
import {selectedEnvironment} from '../../firebase/config'
import {initializeReactGA} from '../../config/googleAnalytics'

configureScope()

export class App extends Component {

  componentWillMount(){
    const {_persist} = this.props
    if (!_persist.rehydrated) return null
    this.configureApp()
    this.updateSystemParams()
  }

  componentDidUpdate(){
    const {_persist} = this.props
    if (_persist.rehydrated && !this.paramsUpdated) {
      this.configureApp()
      this.updateSystemParams()
    }
  }
  
  configureApp = () => {
    const {users} = this.props
    const user = users.authenticatedUserId ? users.usersById[users.authenticatedUserId] : null
    initializeReactGA(user)
  }
  updateSystemParams = () => {
    const {actions, system} = this.props
    if(system.environment !== selectedEnvironment) {
      if(system.environment){
        //only do if the current environment is not set to null (it is set at all)
        actions.logout()
        const logoutMessage = `Logged out due to environment change from ${system.environment} to ${selectedEnvironment}`
        logError(logoutMessage)
        alert(logoutMessage)
      }
    }
    actions.setEnvironment()
    if(system.version !== version){
      actions.logout()
      alert(`Logged out due to upgrade from version ${system.version} to version ${version}`)
    }
    actions.setVersion()
    actions.saveCountries(countryList)
    actions.selectDefaultCountry("ug")
    this.paramsUpdated = true
  }

  

  componentWillUnmount(){
    const {actions} = this.props
    actions.toggleLoading(false)
  }

  componentDidCatch(error, errorInfo) {
    //catch all crashes across the app
    logError(error, errorInfo)
  }

  render(){
    const {system, _persist} = this.props
    if (!_persist.rehydrated) return null
    if (!this.paramsUpdated) return null
    return (
      <Fragment>
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path={INDEX} component={Main}/>
            </Switch>
        </Router>
        {
          system.isLoading ?
            <LoadingScreen />
            :
            null
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  system: state.system,
  _persist: state._persist,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);