import React, {Component} from 'react';
import styles from './App.module.css';
import Login from '../../screens/Login'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class App extends Component {
  render(){
    const {users} = this.props
    return (
      <div className={styles.container}>
        {
          users.authenticatedUserId ?
          <div>welcome to the dash!</div>
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