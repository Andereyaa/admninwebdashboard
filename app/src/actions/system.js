export const SET_VERSION = "SET_VERSION"
export const SET_ENVIRONMENT = "SET_ENVIRONMENT"
export const TOGGLE_LOADING = "TOGGLE_LOADING"

export const setVersion = () => {
    return {
        type: SET_VERSION
    }
} 

export const setEnvironment = () => {
    return {
        type: SET_ENVIRONMENT
    }
} 

export const toggleLoading = isLoading => {
    return {
        type: TOGGLE_LOADING,
        payload: {isLoading}
    }
}