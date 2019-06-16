import {logError} from "./errorHandling"

const phoneRegex = /^\+?[0-9]+$/g

export const findCountryForPhoneNumber= (phoneNumber, countries) => {
    if (typeof phoneNumber !== 'string') {
        logError(`phone number ${phoneNumber} is not a string`)
        return
    }
    if (!phoneNumber.match(phoneRegex)) {
        logError(`phone number ${phoneNumber} contains invalid numbers`)
        return
    }
    let country
    if (phoneNumber.startsWith("+")){
        //these phone numbers almost certainly start with an area code
        //we detect the correct country by 
        //  1. checking that the phone number starts with the country's dialing code
        //  2. checking that the length of the phone number conforms to the country's phone num length    
        country = countries.find(country => {
            return phoneNumber.startsWith(country.dialingCode) &&
                    phoneNumber.length === country.lengthOfPhoneNumberWithDialingCodeAndPlus
        })
    } else {
        //ignore the lack of a + and try the same strategy above checking dialing code and length minus 1 
        country = countries.find(country => {
            return phoneNumber.startsWith(country.dialingCode.substring(1)) &&
                    phoneNumber.length === (country.lengthOfPhoneNumberWithDialingCodeAndPlus - 1)
        })
        //by now, we are sure that it is not a full phone number, we also cannot detect 
        // what country it is from
    }
    //if there are no results, return
    if (!country) return
    const phoneNumberWithoutDialingCode = phoneNumber.substring(country.dialingCode.length)
    return {country, phoneNumberWithoutDialingCode}
}

export const verifyPhoneNumber = (phoneNumberWithoutDialingCode, country) => {
    let verifiedPhoneNumber
    if (typeof phoneNumberWithoutDialingCode !== 'string') {
        return
    }
    if (typeof country !== 'object' || !country) {
        logError(`country ${country} is not an object`)
        return
    }

    if (!phoneNumberWithoutDialingCode.match(phoneRegex)) {
        return
    }
    if ((phoneNumberWithoutDialingCode.length + country.dialingCode.length) 
        === country.lengthOfPhoneNumberWithDialingCodeAndPlus){
            //if the length of the phone number combined with the dialing code is correct
            // we assume it is a valid phone number
            verifiedPhoneNumber = phoneNumberWithoutDialingCode
    } else if (
        country.localNumbersHaveLeadingZero &&
        phoneNumberWithoutDialingCode.startsWith("0") &&
        ((phoneNumberWithoutDialingCode.length - 1 + country.dialingCode.length) 
        === country.lengthOfPhoneNumberWithDialingCodeAndPlus)
    ){
        verifiedPhoneNumber = phoneNumberWithoutDialingCode.substring(1)
    }
    return verifiedPhoneNumber
}