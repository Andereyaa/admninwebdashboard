import * as types from '../actions'
import {initialState} from './index'

//STATE
// institution: {
//     id: null,
//     standardRate: 0,
// }

const institutionReducer = (state = initialState.institution, action = {}) => {
    const {type, payload} = action;
    switch (type) {

        case types.LOGOUT:
            return initialState.institution;

        case types.SAVE_INSTITUTION:

            return {
                ...state,
                ...payload.institution,
                id: payload.id
            };
        default:
            return state
    }
};

export default institutionReducer