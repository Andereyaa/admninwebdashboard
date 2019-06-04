import milkCollectionsReducer from '../milkCollections'
import * as types from '../../actions'

let initialState
beforeEach(() => {
    initialState = {
        milkCollectionsById: {},
        milkCollectionIdsBySupplierId: {},
        milkCollectionIds: [],
        selectedId: null
    }
})

it('should return the initial state', ()=>{
    const result = milkCollectionsReducer(undefined, {})
    expect(result).toEqual(initialState)
})