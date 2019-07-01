import React, {Component} from 'react'
import LoginForm from '../../containers/LoginForm'
import EnvironmentBadge from '../../containers/EnvironmentBadge'
import VersionBadge from '../../containers/VersionBadge'

import styles  from './Login.module.css'
import {INCORRECT_PASSWORD, INCORRECT_USER, USER_LOGIN_NOT_ALLOWED} from '../../constants/errors'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from "redux";

import { Redirect } from 'react-router-dom';

export class Login extends Component {

    authenticate = async (email, password) => {
        const {actions} = this.props
        let response = await actions.fetchLogin(email, password)
        if (response.success){
           response = await actions.fetchUser(response.userId, true)
        } 
        if (!response.success){
            actions.logout()
            switch (response.code){
                case INCORRECT_PASSWORD : alert(`Login Failed - Please verify your login credentials and try again`); break;
                case INCORRECT_USER : alert(`Login Failed - Please verify your login credentials and try again`); break;
                case USER_LOGIN_NOT_ALLOWED : alert(`Login Not Allowed - Your credentials are correct but you are not allowed to login to the webapp`); break;
                default: alert(`Login Failed`)
            } 
        }
         
    }
    render (){
        const {users} = this.props
        if (!users) return null
        if(
            users.authenticatedUserId && 
            users.authenticatedUserIsAuthorized
        ) {
        return <Redirect to="/" />;
        }

        return (
        <div className={styles.container}>
            <div className={styles.badges}>
                <EnvironmentBadge />

                <span className={styles.versionBadge}><VersionBadge /></span>
            </div>
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