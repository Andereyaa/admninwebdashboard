import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm'
import styles  from './Login.module.css'

export default class Login extends Component {
    render (){
        return (
        <div className={styles.container}>
            <LoginForm />
        </div>
        )
    }
}