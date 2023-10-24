import * as types from '../actions'
import {initialState} from './index'
import {logError} from '../utils/errorHandling'
//STATE
// users: {
//     usersById: {},
//     userIds: [],
//     selectedId: null,
//     authenticatedUserIsAuthorized: false,
//     authenticatedUserId: null,
// }

const usersReducer = (state = initialState.users, action = {}) => {
    const {type, payload} = action;
    const usersById = {...state.usersById};
    switch (type) {
        case types.LOGIN: {
            if (!payload.id && (payload.id !== 0)) {
                logError('usersReducer/LOGIN: The logged in user has no id or the id has not been provided')
                return state
            }
            return {
                ...state,
                authenticatedUserId: payload.id,
            }
        }

        case types.SET_AUTHENTICATED_USER_IS_AUTHORIZED: {
            if (typeof payload.isAuthorized !== "boolean" ){
                logError(`usersReducer/SET_AUTHENTICATED_USER_IS_AUTHORIZED: The non-boolean value ${payload.isAuthorized} has been provided`)
                return state
            }
            return {
                ...state,
                authenticatedUserIsAuthorized: payload.isAuthorized
            }
        }

        case types.LOGOUT:
            return initialState.users;

        case types.SAVE_USER:
            if(!payload.id && (payload.id !== 0)){
                logError(`usersReducer/SAVE_USER: The id ${payload.id} provided for the the user ${JSON.stringify(payload.user)} is undefined or falsy`)
                return state
            }
            usersById[payload.id] = {id: payload.id, ...usersById[payload.id], ...payload.user};
            return {
                ...state,
                userIds: Object.keys(usersById),
                usersById,
            };
        default:
            return state
    }
};

export default usersReducer