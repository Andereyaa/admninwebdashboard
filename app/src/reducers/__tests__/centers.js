import centersReducer from '../centers'
import * as types from '../../actions'

let initialState
beforeEach(() => {
    initialState = {
        centersById: {},
        centerIds: [],
        selectedId: null
    }
})

it('should return the initial state', ()=>{
    const result = centersReducer(undefined, {})
    expect(result).toEqual(initialState)
})