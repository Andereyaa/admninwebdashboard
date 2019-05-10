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
                <LogoTitle title="Boresha Dashboard"/>
                <div className={styles.fields}>
                    <FormField label='Phone / Email' icon='person'/>
                    <FormField 
                        label='Password' 
                        icon='lock'
                        type='password'
                    />
                    <div className={styles.buttonContainer}>
                    <RoundedButton text="Login"/>
                    </div>
                </div>
                <Link text="Forgot your password?"/>
            </div>
        )
    }
}