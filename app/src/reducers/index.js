import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import users from './users'
import institution from './institution'
import centers from './centers'

const config = {
    key: 'primary',
    whitelist: [],
    storage
};

export const initialState = {
    users: {
        usersById: {},
        userIds: [],
        selectedId: null,
        authenticatedUserIsAuthorized: false,
        authenticatedUserId: null
    },
    institution: {
        id: null, 
        institutionName: null,
        ownerId: null,
        totalCapacity: 0,
        standardRate: 0,
    },
    centers: {
        centersById: {},
        centerIds: [],
        selectedId: null
    }
};
const rootReducer = persistCombineReducers(config, {
    users,
    institution,
    centers
});

export default rootReducer