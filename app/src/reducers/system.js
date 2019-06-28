/**
 *  Purpose: the modifications that are carried on the User object for each command
 */

import {initialState} from './index'
import * as types from '../actions/index'
import {selectedEnvironment} from '../firebase/config'

const systemReducer = (state = initialState.system, action) => {
    const {type, payload} = action;
    switch (type){
        case types.SET_VERSION: {
            return {
                ...state,
                version: initialState.system.version
            }
        }
        case types.SET_ENVIRONMENT: {
            return {
                ...state,
                environment: selectedEnvironment
            }
        }

        default:
            return state
        
    }
}

export default systemReducer