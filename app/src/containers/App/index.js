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

export class App extends Component {

  componentWillMount(){
    const {actions} = this.props
    actions.setEnvironment()
    actions.setVersion()
    actions.saveCountries(countryList)
    actions.selectDefaultCountry("ug")
    
  }

  componentWillUnmount(){
    const {actions} = this.props
    actions.toggleLoading(false)
  }

  render(){
    const {system} = this.props
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
  system: state.system
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);