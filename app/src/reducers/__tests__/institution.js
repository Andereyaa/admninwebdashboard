import institutionReducer from '../institution'
import * as types from '../../actions'

let initialState
beforeEach(() => {
    initialState = {
        id: null, 
        institutionName: null,
        ownerId: null,
        totalCapacity: 0,
        standardRate: 0,
    }
})

it('should return the initial state', ()=>{
    const result = institutionReducer(undefined, {})
    expect(result).toEqual(initialState)
})