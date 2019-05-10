import React, {Component} from 'react'
import styles from './LoginForm.module.css'
import FormField from '../FormField'
import LogoTitle from '../LogoTitle'
import RoundedButton from '../RoundedButton'
import Link from '../Link'
import PropTypes from 'prop-types';

export default class LoginForm extends Component {

    state = {
        userId: "",
        password: ""
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }
    
    handleChange = (value, name) => {
        if (!name && (name !== 0)) throw new Error('Cannot update state, no name value specified')
        else if (!(name in this.state)) throw new Error(`The name "${name}" is not a key in state`) 
        else{
            this.setState({[name]: value})
        }
    }

    handleSubmit = () =>{
        if(this.validate()){
            const {userId, password} = this.state
            const {onSubmit} = this.props
            if (!onSubmit) throw new Error('No onSubmit function provided')
            else {
                onSubmit(userId, password)
            }
        }
    }

    validate = () => {
        return true
    }
    render (){
        const {userId, password} = this.state 
        return (
            <div className={styles.container}>
                <LogoTitle title="Boresha Dashboard"/>
                <div className={styles.fields}>
                    <FormField 
                        label='Phone / Email' 
                        icon='person'
                        name="userId"
                        value={userId}
                        onChange={this.handleChange}
                    />
                    <FormField 
                        label='Password' 
                        icon='lock'
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                    />
                    <div className={styles.buttonContainer}>
                    <RoundedButton 
                        text="Login"
                        onClick={this.handleSubmit}
                    />
                    </div>
                </div>
                <Link text="Forgot your password?"/>
            </div>
        )
    }
}