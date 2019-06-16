/**
 * Purpose: to specify the commands that are allowed on the Country objects in state
 */
import firebase, {firestore} from '../firebase'
import {logError} from "../utils/errorHandling"

export const SAVE_COUNTRIES = 'SAVE_COUNTRIES'
export const SELECT_DEFAULT_COUNTRY = 'SELECT_DEFAULT_COUNTRY'

export const saveCountries = (countries) => {
    return {
        type: SAVE_COUNTRIES,
        payload: {
            countries
        }
    }
}

export const selectDefaultCountry = (countryId) => {
    return {
        type: SELECT_DEFAULT_COUNTRY,
        payload: {
            countryId
        }
    }
}