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
        case types.LOGOUT:
            state.centerIds.forEach(centerId => {
                const center = centersById[centerId]
                if (center.unsubscribeFunction) center.unsubscribeFunction()
            })
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
            const previousCenter = centersById[payload.id]
            center.historicalDataLoaded = previousCenter ? previousCenter.historicalDataLoaded : false
            centersById[payload.id] = center
            return {
                ...state,
                centersById,
                centerIds: Object.keys(centersById)
            }
        }

        case types.UNSUBSCRIBE_FROM_CENTER: {
            const center = {...centersById[payload.id]}
            if (center.unsubscribeFunction){
                center.unsubscribeFunction()
                delete center.unsubscribeFunction
            }
            return {
                ...state,
                centersById: {
                    ...centersById,
                    [payload.id]: center
                }
            }
        }
        case types.SELECT_CENTER: {
            return {
                ...state,
                selectedId: payload.id
            }
        }

        case types.SAVE_MILK_COLLECTIONS: {
            const center = {...centersById[payload.centerId]}
            center.historicalDataLoaded = true
            return {
                ...state,
                centersById:{
                    ...centersById,
                    [payload.centerId]: center
                }
            }
        }

        default:
            return state
    }
};

export default centersReducer