import React, {Component} from 'react';
import styles from './App.module.css';
import Login from '../../screens/Login'
import ScreenContent from '../ScreenContent'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class App extends Component {
  render(){
    const {users, location} = this.props
    if (!users) return null
    if (!location) return null
    return (
      <div className={styles.container}>
        {
          users.authenticatedUserId ?
          <ScreenContent currentScreenPathname={location.pathname}>
            {this.props.children}
          </ScreenContent>
          :
          <Login />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);