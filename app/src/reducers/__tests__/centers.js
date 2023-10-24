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

describe('test logout', ()=> {
    it('should return the initial state', () => {
        const action = {
            type: types.LOGOUT
        }
        const result = centersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })
})

describe('test save_center', ()=> {
    it('should add the centers id to state.centerIds', () => {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                id: '1234',
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(initialState.centerIds.length).toBe(0)
        expect(result.centerIds.length).toBe(1)
        expect(result.centerIds[0]).toBe('1234')
    })

    it('should add the center to state.centersById', () => {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                id: '1234',
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(initialState.centersById['1234']).toBe(undefined)
        expect(result.centersById['1234']).toEqual({
            id: '1234',
            name: 'test center'
        })
    })

    it('should fail if no id is provided', ()=> {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should fail if the id is an empty string', ()=> {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                id: "",
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should fail if the id is null', ()=> {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                id: null,
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should not fail if the id is 0', ()=> {
        const action = {
            type: types.SAVE_CENTER,
            payload:{
                id: 0,
                center:{
                    name: 'test center'
                }
            }
        }
        const result = centersReducer(initialState, action )
        expect(result.centersById[0]).toEqual({
            id: 0,
            name: 'test center'
        })
    })
})

describe('test select_center', ()=> {
    it('should change the value of selectedId', () => {
        const action = {
            type: types.SELECT_CENTER,
            payload: {
                id: 1234
            }
        }
        const result = centersReducer(initialState, action )
        expect(result.selectedId === initialState.selectedId).toBeFalsy()
        expect(result.selectedId).toBe(1234)
    })
})