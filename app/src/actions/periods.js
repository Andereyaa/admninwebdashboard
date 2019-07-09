export const SELECT_PERIOD = 'SELECT_PERIOD'

export const selectPeriod = id => {
    return {
        type: SELECT_PERIOD,
        payload: {
            id
        }
    }
}