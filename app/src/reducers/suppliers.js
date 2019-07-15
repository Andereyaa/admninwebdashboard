import * as types from '../actions'
import {initialState} from './index'

//STATE
// suppliers: {
//     suppliersById: {},
//     supplierIds: [],
//     selectedId: null
// }

const suppliersReducer = (state = initialState.suppliers, action = {}) => {
    const {type, payload} = action;
    let suppliers
    const suppliersById = {...state.suppliersById}
    
    switch (type) {

        case types.LOGOUT:
            return initialState.suppliers;

        case types.SAVE_CENTER:
            if (!payload.center.suppliers){
                return state
            }
            suppliers = payload.center.suppliers ? Object.values(payload.center.suppliers) : []
            let updatedState = addListOfSuppliersToState(suppliers, suppliersById)
            return {
                ...state,
                supplierIds: updatedState.supplierIds,
                suppliersById: updatedState.suppliersById
            }
        default:
            return state
    }
};

const addListOfSuppliersToState = (supplierList, suppliersById) => {
    const newSuppliersById = {...suppliersById}
    supplierList.forEach(supplierData => {
        //save suppliers object in redux, overwriting anything previously there
        //this ensures updates happen across phones
        //TODO must now add new mechanism to handle deletions
        newSuppliersById[supplierData.id] = {
            ...suppliersById[supplierData.id],
            ...supplierData
        }
    });
    return {suppliersById: newSuppliersById, supplierIds: Object.keys(newSuppliersById)}
}

export default suppliersReducer