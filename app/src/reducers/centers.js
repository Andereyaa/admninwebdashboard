import * as types from '../actions'
import {initialState} from './index'
import {logError} from '../utils/errorHandling'

//STATE
// centers: {
//     centersById: {},
//     centerIds: [],
//     selectedId: null,
// }

const centersReducer = (state = initialState.centers, action = {}) => {
    const {type, payload} = action;
    const centersById = {...state.centersById};
    switch (type) {

        //from rn app
        // case types.LOGOUT: {
        //     if (state.unsubscribeFunction) state.unsubscribeFunction()
        //     return initialState.center
        // }

        case types.LOGOUT:
            return initialState.centers;
        
        case types.SAVE_CENTER: {
            if (!payload.id && (payload.id !== 0)){
                logError(`centersReducer/SAVE_CENTER: The id ${payload.id} is either undefined or falsy `)
                return state
            }
            const center = {...payload.center}
            delete center.suppliers
            delete center.deletedMilkCollections
            delete center.volumeCollectedToday
            delete center.milkCollectionsToday
            delete center.activeSuppliersToday
            center.id = payload.id
            centersById[payload.id] = center
            return {
                ...state,
                centersById,
                centerIds: Object.keys(centersById)
            }
        }

        default:
            return state
    }
};

export default centersReducer