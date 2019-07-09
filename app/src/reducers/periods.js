import * as types from '../actions'
import {initialState} from './index'
import {getPeriodsBetweenTwoDatesInclusive} from '../utils/dateHandling'

//STATE
// periods: {
//     periodsById: {},
//     periodIdsLoaded
//     periodIds: [],
//     selectedId: null
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
                periodsById[startDate] = {...existingPeriod, startDate, endDate, id: startDate, dateLoadedByCenterId: {}}
                return periodsById
            }, {})
            const periodIds = Object.keys(periodsById)
            const selectedId = state.selectedId ? state.selectedId : periodIds[periodIds.length - 1] 
            return {
                ...state,
                periodIds,
                periodsById,
                selectedId
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
            period.dateLoadedByCenterId[payload.centerId] = Date.now()
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