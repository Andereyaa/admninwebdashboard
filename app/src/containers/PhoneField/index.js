import React, {Component} from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import FormField from '../FormField'
import './PhoneInput.css'
import styles from './PhoneField.module.css'

import {connect} from 'react-redux'

export class PhoneField extends Component {

    constructor(props){
        super(props)
        const {countries} = this.props
        const defaultCountryId = countries.defaultCountryId ? countries.defaultCountryId : "ug"
        const defaultCountry = countries.countriesById[defaultCountryId] 
        const includedCountryIds = countries.countryIds.map(countryId => countryId.toUpperCase())
        this.state = {
            countryId: defaultCountry.id.toUpperCase(),
            dialingCode: defaultCountry.dialingCode,
            includedCountryIds
        }
    }

    handleChangeText = (event) => {
        const {onChange, name} = this.props
        onChange(event.target.value, name)
    }

    handleCountryChange = countryId => {
        if (!countryId) return
        const {countries} = this.props
        const country = countries.countriesById[countryId.toLowerCase()]
        this.setState({
            dialingCode: country.dialingCode,
            countryId: String(country.id).toUpperCase()
        })
    }
    render () {
        const {dialingCode, countryId, includedCountryIds} = this.state
        const {error, label, value} = this.props
        return (
            <div className={styles.container}>
                <label className={styles.label}>{label}</label>
                {error ? <span className={styles.error}>{error}</span> : null }
                <div className={styles.inputContainer}>
                    <PhoneInput 
                        onChange={()=>{}} 
                        international={false}
                        country={countryId}
                        countries={includedCountryIds}
                        value={dialingCode}
                        onCountryChange={this.handleCountryChange}
                        disablePhoneInput={true}
                    />
                    <input 
                        className={styles.input} 
                        type="tel" 
                        autoComplete="tel"
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