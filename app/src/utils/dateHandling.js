import moment from "moment-timezone"
import {configureStore} from '../store/configureStore'


export const getLocalStartOfDayTimestamp = () => new Date().setHours(0, 0, 0, 0);

export const integerToOrdinalNumber = int => {
    if (int < 1 || int > 31) throw new Error("Integer does not correspond to a day in any month")
    //deal with the teens
    if (int >= 10 && int <= 20) return `${int}th` 
    const lastDigit = int % 10
    let ending
    switch (lastDigit) {
        case 1: ending = "st"; break;
        case 2: ending = "nd"; break;
        case 3 : ending = "rd"; break;
        default: ending = "th"; break;
    }
    return `${int}${ending}`
}

export const ordinalNumberToInteger = ordinalNumberString => Number(ordinalNumberString.slice(0, -2))

export const findPeriodRangeForDate = timestamp => {
    const dateInRange = getMomentLocalToSelectedCountry(timestamp)
    const day = dateInRange.date()
    const periodRange = {}
    if (day <=15) { 
        periodRange.startDate = getMomentLocalToSelectedCountry([dateInRange.year(), dateInRange.month(), 1])
        periodRange.endDate = getMomentLocalToSelectedCountry([dateInRange.year(), dateInRange.month(), 15]).endOf('day')
    } else {
        periodRange.startDate = getMomentLocalToSelectedCountry([dateInRange.year(), dateInRange.month(), 16])
        periodRange.endDate = getMomentLocalToSelectedCountry(dateInRange).endOf('month');
    }
    return periodRange
}

export const getPeriodsBetweenTwoDatesInclusive = (startDateTimestamp, endDateTimestamp) => {
    if (!(endDateTimestamp > startDateTimestamp)) throw new Error('The ending timestamp must be greater than the starting timestamp')
    const startPeriod = findPeriodRangeForDate(startDateTimestamp)
    const periods = []
    periods.push(startPeriod)
    const endPeriod = findPeriodRangeForDate(endDateTimestamp)
    if (startPeriod.startDate.isSame(endPeriod.startDate, 'day')) return periods //if the start date and end date fall in the same period, return the first period
    let nextPeriod
    do {
        const lastDay = periods[periods.length - 1].endDate
        const nextDay = lastDay.add('days', 1).startOf('day');
        nextPeriod = findPeriodRangeForDate(nextDay.valueOf())
        periods.push(nextPeriod)
    } while (!(nextPeriod.startDate.isSame(endPeriod.startDate, 'day')))
    return periods
}

export const getMomentLocalToSelectedCountry = (value = null) => {
    // const store = configureStore()
    // const {countries} = store.getState()
    // const selectedCountry = countries.selectedId ? countries.countriesById[countries.selectedId] : countries.countriesById["ug"]
    // return value ? momentTz.tz(value, selectedCountry.timeZone) : momentTz.tz(selectedCountry.timeZone)
    
    //TODO: figure out ho to make this work for multiple countries while getting around usage of store.getState()
    //Error: You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.
    //then the ^ will work 
    const timeZone = "Africa/Kampala"
    return value ? moment.tz(value, timeZone) : moment.tz(timeZone)
}

export const getMinutesFromMoment = timestamp => {
    return moment(timestamp).format('m')
}