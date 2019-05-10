import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm'
import styles  from './Login.module.css'

export default class Login extends Component {

    authenticate = (email, password) => {
        alert(`Authenticating with ${email} and ${password}`)
    }
    render (){
        return (
        <div className={styles.container}>
            <LoginForm onSubmit={this.authenticate}/>
        </div>
        )
    }
}