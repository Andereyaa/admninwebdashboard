import React, {Component} from 'react';
import Main from '../Main'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import {countryList} from "../../data/countries"

import Login from '../../screens/Login'

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {INDEX} from '../../constants/screenPathnames'

export class App extends Component {

  componentDidMount(){
    const {actions} = this.props
    actions.saveCountries(countryList)
  }

  render(){
    return (
      <Router>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path={INDEX} component={Main}/>
          </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(App);