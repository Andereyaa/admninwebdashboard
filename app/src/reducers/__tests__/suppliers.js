import suppliersReducer from '../suppliers'
import * as types from '../../actions'

let initialState
beforeEach(() => {
    initialState = {
        suppliersById: {},
        supplierIds: [],
        selectedId: null
    }
})

it('should return the initial state', ()=>{
    const result = suppliersReducer(undefined, {})
    expect(result).toEqual(initialState)
})