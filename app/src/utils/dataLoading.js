import {DAY_IN_MILLISECONDS} from '../constants/time'

export const shouldLoadMilkCollectionsForCenter = (selectedPeriod, periods, centerId) => {

    return (
        (selectedPeriod.id === periods.currentPeriodId) || //if the selected period is the current period
        !selectedPeriod.dateLoadedByCenterId[centerId] ||
        selectedPeriod.dateLoadedByCenterId[centerId] < (Date.now() - DAY_IN_MILLISECONDS))

}