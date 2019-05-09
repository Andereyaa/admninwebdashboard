import React, {Component} from 'react'
import styles from './LoginForm.module.css'
import FormField from '../FormField'
import LogoTitle from '../LogoTitle'
import RoundedButton from '../RoundedButton'
import Link from '../Link'

export default class LoginForm extends Component {
    render (){
        return (
            <div className={styles.container}>
                <LogoTitle />
                <FormField />
                <FormField />
                <RoundedButton/>
                <Link />
            </div>
        )
    }
}