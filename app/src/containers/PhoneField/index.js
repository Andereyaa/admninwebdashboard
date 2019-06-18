import React, {Component} from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './PhoneInput.css'
import styles from './PhoneField.module.css'

import {connect} from 'react-redux'

import {fieldValueIsAPhoneNumber} from "../../utils/phoneNumberHandling"
export class PhoneField extends Component {

    handleChangeCountry = countryId => {
        const {onChangeCountry} = this.props
        onChangeCountry(countryId.toLowerCase())
    }

    handleChangePhoneNumber = (event) => {
        if (fieldValueIsAPhoneNumber(event.target.value)){
            const {onChangePhoneNumber, name} = this.props
            onChangePhoneNumber(event.target.value, name)
        }
    }

    
    render () {
        const {countryId, error, label, value, countries} = this.props
        const country = countryId ? countries.countriesById[countryId] : countries.countriesById["ug"]
        const includedCountryIds = this.props.includedCountryIds.map(countryId => countryId.toUpperCase())
        return (
            <div className={styles.container}>
                <label className={styles.label}>{label}</label>
                {error ? <span className={styles.error}>{error}</span> : null }
                <div className={styles.inputContainer}>
                    <PhoneInput 
                        onChange={()=>{}} 
                        international={false}
                        country={country.id.toUpperCase()}
                        countries={includedCountryIds}
                        value={country.dialingCode}
                        onCountryChange={this.handleChangeCountry}
                        disablePhoneInput={true}
                    />
                    <input 
                        className={styles.input} 
                        type="tel" 
                        autoComplete="tel"
                        onChange={this.handleChangePhoneNumber}
                        value={value}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    countries: state.countries
})
export default connect(mapStateToProps)(PhoneField)