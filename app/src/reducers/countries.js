/**
 *  Purpose: the modifications that are carried on the Country objects for each command
 */

import {initialState} from './index'
import * as types from '../actions/index'

// STATE
// countries:{
//   countriesById:{},
//   countryIds: [],
//   defaultCountryId: null
// }


const countriesReducer = (state = initialState.countries, action) => {
    const {type, payload} = action;
    let countriesById = {...state.countriesById}
    switch (type){

        case types.SAVE_COUNTRIES: {
            countriesById = payload.countries.reduce((countriesById, country) => {
                countriesById[country.id] = country
                return countriesById
            }, {})

            return {
                ...state,
                countriesById,
                countryIds: Object.keys(countriesById)
            }
        }

        case types.SELECT_DEFAULT_COUNTRY: {
            return {
                ...state,
                defaultCountryId: payload.countryId
            }
        }
    }

    return state;
}

export default countriesReducer