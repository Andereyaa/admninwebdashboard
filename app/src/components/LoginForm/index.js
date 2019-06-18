import React, {Component} from 'react'
import styles from './LoginForm.module.css'
import FormField from '../FormField'
import PhoneField from '../../containers/PhoneField'

import LogoTitle from '../LogoTitle'
import RoundedButton from '../RoundedButton'
import Link from '../Link'
import PropTypes from 'prop-types';

//form validation
import {fieldValueIsNotBlank} from '../../utils/formValidation'
import {verifyPhoneNumber} from '../../utils/phoneNumberHandling'
import {BLANK_USER_ID, BLANK_PASSWORD, INVALID_PHONE_NUMBER} from '../../constants/errors'

import {connect} from 'react-redux'

export class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            phoneNumber: "",
            password: "",
            countryId: props.countries && props.countries.defaultCountryId ? 
                                props.countries.defaultCountryId : "ug" ,
            errors: {}
        }
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
            const {phoneNumber, password, countryId} = this.state
            const {onSubmit} = this.props
            if (!onSubmit) throw new Error('No onSubmit function provided')
            else {
                const {countries} = this.props
                const country = countries.countriesById[countryId]
                const verifiedFullPhoneNumber = `${country.dialingCode}${verifyPhoneNumber(phoneNumber, country)}`
                const userId = this.getUserId(verifiedFullPhoneNumber)
                alert(`${userId} ${password}`)
                // onSubmit(userId, password)
            }
        }
    }

    getUserId = baseUserId => {
        //TODO expand to deal with email case
        return `${baseUserId}@boresha.tech`
    }

    validate = () => {
        const {phoneNumber, password, countryId} = this.state
        const errors = {
            phoneNumber: null,
            password: null
        }
        if (!fieldValueIsNotBlank(phoneNumber)) errors.phoneNumber = BLANK_USER_ID
        if (!fieldValueIsNotBlank(password)) errors.password = BLANK_PASSWORD
        const {countries} = this.props
        const country = countries.countriesById[countryId]
        if (!errors.phoneNumber && !verifyPhoneNumber(phoneNumber, country)) errors.phoneNumber = INVALID_PHONE_NUMBER
        if (Object.values(errors).every(error => !error)) return true
        else {
            this.setState({errors})
            return false
        }
    }
    render (){
        const {phoneNumber, password, errors} = this.state 
        return (
            <div className={styles.container}>
                <LogoTitle title="Boresha Dashboard"/>
                <div className={styles.fields}>
                    <PhoneField 
                        error={errors.phoneNumber}
                        label='Phone' 
                        icon='phone'
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={this.handleChange}
                        type='tel'
                    />
                    <FormField 
                        error={errors.password}
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

const mapStateToProps = state => ({
    countries: state.countries
})

export default connect (mapStateToProps)(LoginForm)