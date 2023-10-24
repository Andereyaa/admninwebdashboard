import usersReducer from '../users'
import * as types from '../../actions'

let initialState
beforeEach(() => {
    initialState = {
        usersById: {},
        userIds: [],
        selectedId: null,
        authenticatedUserIsAuthorized: false,
        authenticatedUserId: null
    }
})

it('should return the initial state', ()=>{
    const result = usersReducer(undefined, {})
    expect(result).toEqual(initialState)
})

describe('test login', () => {
    it('should set the authenticatedUserId during login', () => {
        const action = {
            type: types.LOGIN,
            payload: {
                id: 1234
            }
        }
        const result = usersReducer(initialState, action )
        expect(initialState.authenticatedUserId === result.authenticatedUserId).toBeFalsy()
        expect(result.authenticatedUserId).toBe(1234)
    })

    it('should fail if the id provided is null', ()=> {
        const action = {
            type: types.LOGIN,
            payload: {
                id: null
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should fail if the id provided is an empty string', ()=> {
        const action = {
            type: types.LOGIN,
            payload: {
                id: ""
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should not fail if the id provided is zero', ()=> {
        const action = {
            type: types.LOGIN,
            payload: {
                id: 0
            }
        }
        const result = usersReducer(initialState, action )
        expect(initialState.authenticatedUserId === result.authenticatedUserId).toBeFalsy()
        expect(result.authenticatedUserId).toBe(0)
    })
})

describe('test set_authenticated_user_is_authorized', () => {
    it('should set the authorization of the authentication user to true, if true is proived', () => {
        const action = {
            type: types.SET_AUTHENTICATED_USER_IS_AUTHORIZED,
            payload: {
                isAuthorized: true
            }
        }
        const result = usersReducer(initialState, action )
        expect(initialState.authenticatedUserIsAuthorized === result.authenticatedUserIsAuthorized).toBeFalsy()
        expect(result.authenticatedUserIsAuthorized).toBe(true)
    })

    it('should set the authorization of the authentication user to false, if false is proived', () => {
        const action = {
            type: types.SET_AUTHENTICATED_USER_IS_AUTHORIZED,
            payload: {
                isAuthorized: false
            }
        }
        const result = usersReducer(initialState, action )
        expect(result.authenticatedUserIsAuthorized).toBe(false)
    })

    it('should fail if the value provided is a string', () => {
        const action = {
            type: types.SET_AUTHENTICATED_USER_IS_AUTHORIZED,
            payload: {
                isAuthorized: "1234"
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should fail if the value provided is a number', () => {
        const action = {
            type: types.SET_AUTHENTICATED_USER_IS_AUTHORIZED,
            payload: {
                isAuthorized: 222
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })
})

describe('test logout', ()=> {
    it('should return the initial state', () => {
        const action = {
            type: types.LOGOUT
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })
})

describe ('test save_user', () =>{
    it('should add the users id to state.userIds', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                id: "1234",
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(initialState.userIds.length === result.userIds.length).toBeFalsy()
        expect(result.userIds.length).toEqual(1)
        expect(result.userIds[0]).toEqual("1234")
    })

    it('should add the user to state.usersById', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                id: "1234",
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(initialState.usersById["1234"]).toEqual(undefined)
        expect(result.usersById["1234"]).toBeTruthy()
        expect(result.usersById["1234"]).toEqual({
            id: "1234",
            firstName: 'john',
            lastName: 'brown'
        })
    })

    it('should merge the user onto an existing user with the same id', () => {
        initialState.usersById['1234'] = {
            'age': 13
        }

        const action = {
            type: types.SAVE_USER,
            payload: {
                id: "1234",
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(result.usersById["1234"]).toEqual({
            id: "1234",
            firstName: 'john',
            lastName: 'brown',
            age: 13
        })
    })

    it('should fail if there is no id provided', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should fail if the id provided is an empty string', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                id: "",
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })
    it('should fail if the id provided is null', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                id: null,
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(result).toEqual(initialState)
    })

    it('should not fail if the id provided is zero', () => {
        const action = {
            type: types.SAVE_USER,
            payload: {
                id: 0,
                user: {
                    firstName: 'john',
                    lastName: 'brown'
                }
            }
        }
        const result = usersReducer(initialState, action )
        expect(result.usersById['0']).toEqual({
            id: 0,
            firstName: 'john',
            lastName: 'brown'
        })
    })
})