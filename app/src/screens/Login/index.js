import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm'
import styles  from './Login.module.css'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from "redux";

export class Login extends Component {

    authenticate = async (email, password) => {
        const {actions} = this.props
        actions.fetchLogin(email, password)
    }
    render (){
        return (
        <div className={styles.container}>
            <LoginForm onSubmit={this.authenticate}/>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);