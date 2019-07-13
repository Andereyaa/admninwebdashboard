import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {version} from "../config/release"

import users from './users'
import institution from './institution'
import centers from './centers'
import milkCollections from './milkCollections'
import suppliers from './suppliers'
import countries from './countries'
import system from './system'
import periods from './periods'

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
    },
    milkCollections: {
        milkCollectionsById: {},
        milkCollectionIdsBySupplierId: {},
        milkCollectionIds: [],
        deletedMilkCollectionIds: {},
        selectedId: null
    },
    suppliers: {
        suppliersById: {},
        supplierIds: [],
        selectedId: null
    },
    countries: {
        countriesById:{},
        countryIds: [],
        defaultCountryId: null
    },
    periods: {
        periodsById: {},
        periodIds: [],
        selectedId: null
    },
    system: {
        name: "boresha dashboard",
        version: version,
        isLoading: false
    }   
};

const rootReducer = persistCombineReducers(config, {
    users,
    institution,
    centers,
    milkCollections,
    suppliers,
    countries,
    system,
    periods
});

export default rootReducer