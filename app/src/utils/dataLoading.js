import {DAY_IN_MILLISECONDS, THIRTY_SECONDS_IN_MILLISECONDS} from '../constants/time'

export const shouldLoadMilkCollectionsForCenter = (selectedPeriod, periods, centerId) => {

    //load the milk collections for the center if
    return (
        !selectedPeriod.dateLoadedByCenterId[centerId] || //the period has never been previously loaded OR
        (selectedPeriod.dateLoadedByCenterId[centerId] < (Date.now() - DAY_IN_MILLISECONDS)) || //the period was last loaded 24 hours ago OR
        (
            (selectedPeriod.id === periods.currentPeriodId) &&//the period is the current period and it was last loaded over 30 seconds ago
            (selectedPeriod.dateLoadedByCenterId[centerId] < (Date.now() - THIRTY_SECONDS_IN_MILLISECONDS))    
        )
    ) 

}