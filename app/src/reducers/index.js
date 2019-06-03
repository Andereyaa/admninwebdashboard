import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import users from './users'
import institution from './institution'

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
        authenticatedUserId: null
    },
    institution: {
        id: null, 
        institutionName: null,
        ownerId: null,
        totalCapacity: 0,
        standardRate: 0,
    }
};
const rootReducer = persistCombineReducers(config, {
    users,
    institution
});

export default rootReducer