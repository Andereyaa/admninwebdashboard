import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import users from './users'

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
    }
};
const rootReducer = persistCombineReducers(config, {
    users
});

export default rootReducer