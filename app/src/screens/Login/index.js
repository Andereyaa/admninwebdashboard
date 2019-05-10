import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm'
import styles  from './Login.module.css'
import {INCORRECT_PASSWORD, INCORRECT_USER} from '../../constants/errors'

import * as actions from '../../actions'
import {connect} from "react-redux"
import {bindActionCreators} from "redux";

export class Login extends Component {

    authenticate = async (email, password) => {
        const {actions} = this.props
        const response = await actions.fetchLogin(email, password)
        if (!response.success){
            switch (response.code){
                case INCORRECT_PASSWORD : alert(`Login Failed - Please verify your login credentials and try again`); break;
                case INCORRECT_USER : alert(`Login Failed - Please verify your login credentials and try again`); break;
                default: alert(`Login Failed`)
            }   
        } else {
            actions.fetchUser(response.userId)
        }
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