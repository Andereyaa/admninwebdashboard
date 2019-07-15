import * as types from '../actions'
import {initialState} from './index'
import {getPeriodsBetweenTwoDatesInclusive} from '../utils/dateHandling'

//STATE
// periods: {
//     periodsById: {},
//     periodIds: [],
//     selectedId: null,
//     currentPeriodId: null
// }

const periodsReducer = (state = initialState.periods, action = {}) => {
    const {type, payload} = action;
    switch (type) {

        case types.LOGOUT:
            return initialState.periods;

        case types.SAVE_INSTITUTION: {
            const institutionPeriods = getPeriodsBetweenTwoDatesInclusive(payload.institution.creationDate, Date.now())
            const periodsById = institutionPeriods.reduce((periodsById, period) =>{
                const startDate = period.startDate.valueOf()
                const endDate = period.endDate.valueOf()
                const existingPeriod = state.periodsById[startDate]
                periodsById[startDate] = {
                    ...existingPeriod, 
                    startDate, 
                    endDate, 
                    id: startDate, 
                    dateLoadedByCenterId: existingPeriod && existingPeriod.dateLoadedByCenterId ? existingPeriod.dateLoadedByCenterId : {}
                }
                return periodsById
            }, {})
            const periodIds = Object.keys(periodsById)
            const currentPeriodId = Number(periodIds[periodIds.length - 1])
            const selectedId = state.selectedId ? state.selectedId : currentPeriodId 
            return {
                ...state,
                periodIds,
                periodsById,
                selectedId,
                currentPeriodId
            }
        }

        case types.SELECT_PERIOD: {
            return {
                ...state,
                selectedId: payload.id
            }
        }

        case types.SAVE_MILK_COLLECTIONS: {
            if (!payload.periodId) return state
            const period = {...state.periodsById[payload.periodId]}
            const dateLoadedByCenterId = {...period.dateLoadedByCenterId, [payload.centerId]: Date.now()}
            period.dateLoadedByCenterId = dateLoadedByCenterId
            
            return {
                ...state,
                periodsById: {
                    ...state.periodsById,
                    [payload.periodId]: period
                }
            }
        }
        default:
            return state
    }
};

export default periodsReducer