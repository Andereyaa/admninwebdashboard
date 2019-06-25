import * as types from '../actions'
import {initialState} from './index'

//STATE
// milkCollections: {
//     milkCollectionsById: {},
//     milkCollectionIdsBySupplierId: {},
//     milkCollectionIds: [],
//     selectedId: null
// }

const milkCollectionsReducer = (state = initialState.milkCollections, action = {}) => {
    const {type, payload} = action;
    let milkCollectionsById = {...state.milkCollectionsById}
    let milkCollectionIds = [...state.milkCollectionIds]
    let milkCollectionIdsBySupplierId = {...state.milkCollectionIdsBySupplierId}
    let updatedState

    switch (type) {

        case types.LOGOUT:
            return initialState.milkCollections;

        case types.SAVE_CENTER: {
            let deletedMilkCollectionMap = payload.center.deletedMilkCollections ? payload.center.deletedMilkCollections : {}
            let milkCollections = payload.center.milkCollectionsToday ? Object.values(payload.center.milkCollectionsToday) : []
            updatedState = addListOfMilkCollectionsToState(milkCollections, milkCollectionsById, milkCollectionIdsBySupplierId)
            milkCollectionsById = Object.keys(updatedState.milkCollectionsById).reduce((milkCollections, milkCollectionId) => {
                //remove all milk collections in the deleted map
                if (!deletedMilkCollectionMap[milkCollectionId]) milkCollections[milkCollectionId] = updatedState.milkCollectionsById[milkCollectionId]
                else {
                    const supplierId = updatedState.milkCollectionsById[milkCollectionId].supplierId
                    updatedState.milkCollectionIdsBySupplierId[supplierId] = updatedState.milkCollectionIdsBySupplierId[supplierId].filter((supplierMilkCollectionId) => supplierMilkCollectionId !== milkCollectionId)
                }
                return milkCollections
            }, {})
            return {
                ...state,
                milkCollectionIds: Object.keys(milkCollectionsById),
                milkCollectionIdsBySupplierId: updatedState.milkCollectionIdsBySupplierId,
                milkCollectionsById,
            }
        }
        
        case types.SAVE_MILK_COLLECTIONS: {
            updatedState = addListOfMilkCollectionsToState(payload.milkCollections, milkCollectionsById, milkCollectionIdsBySupplierId)
            return {
                ...state,
                milkCollectionIds: Object.keys(updatedState.milkCollectionsById),
                milkCollectionIdsBySupplierId: updatedState.milkCollectionIdsBySupplierId,
                milkCollectionsById: updatedState.milkCollectionsById
            }
        }

        default:
            return state
    }
};

const addListOfMilkCollectionsToState = (milkCollectionList, milkCollectionsById, milkCollectionIdsBySupplierId) => {
    //save the list of milk collections from the server into state
        
    milkCollectionList.forEach(milkCollectionData => {
        //save milk collection object in redux, overwriting anything previously there
        milkCollectionsById[milkCollectionData.id] = {
            ...milkCollectionsById[milkCollectionData.id],
            ...milkCollectionData
        }
        
        if (!milkCollectionIdsBySupplierId[milkCollectionData.supplierId]) {
            //if this is the first entry for this supplier create an array with the entry for this milk collection
            // under his id
            milkCollectionIdsBySupplierId[milkCollectionData.supplierId] = [milkCollectionData.id]
        } else { //if we already have an id for this supplier
            if (!milkCollectionIdsBySupplierId[milkCollectionData.supplierId].includes(milkCollectionData.id)){
                //if the suppliers list of milk collections does not include the current one, add it to the list
                milkCollectionIdsBySupplierId[milkCollectionData.supplierId].push(milkCollectionData.id)
            }
        }

    });
    return {milkCollectionsById, milkCollectionIdsBySupplierId}
}

export default milkCollectionsReducer