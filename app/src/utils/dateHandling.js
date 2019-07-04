import moment from "moment"

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
    const dateInRange = moment(timestamp)
    const day = dateInRange.date()
    const periodRange = {}
    if (day <=15) { 
        periodRange.startDate = moment([dateInRange.year(), dateInRange.month(), 1])
        periodRange.endDate = moment([dateInRange.year(), dateInRange.month(), 15])
    } else {
        periodRange.startDate = moment([dateInRange.year(), dateInRange.month(), 16])
        periodRange.endDate = moment(dateInRange).endOf('month');
    }
    return periodRange
}