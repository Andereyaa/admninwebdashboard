import React from 'react'
import styles from './PeriodReportTableRow.module.css'

import {getIntegerRange} from '../../utils/numberHandling'
import {numberToCommaSeparatedString} from '../../utils/formatting'
import moment from 'moment'

export default ({supplierId, milkCollectionsByDate = {}, periodStartDate, periodEndDate}) => {
    //TODO revisit in tests across timezones to ensure dates do not cause crash -1 fix
    const dayArray = getIntegerRange(moment(periodStartDate).date(), moment(periodEndDate - 1).date())
    let totalVolume = 0
    let sumPrice = 0
    let milkCollectionCount = 0
    Object.keys(milkCollectionsByDate).forEach(day => {
        const milkCollections = milkCollectionsByDate[day]
        milkCollections.forEach(milkCollection => {
            totalVolume = totalVolume + milkCollection.volumeInLitres
            sumPrice = sumPrice + milkCollection.rateInShillings
            milkCollectionCount += 1
        })
    })
    const avgPrice = milkCollectionCount > 0 ? sumPrice/milkCollectionCount : 0
    const amount = milkCollectionCount > 0 ? avgPrice * totalVolume : 0
    return (
    <tr className={styles.container}>
        {
        dayArray.map(day => {
            const dailyTotal = milkCollectionsByDate[day] ? milkCollectionsByDate[day].reduce( (sum, milkCollection) => (sum + milkCollection.volumeInLitres), 0) : 0     
            const cellStyle = dailyTotal == 0 ? styles.highlight : null
            return <td key={`${supplierId}${day}`} className={[styles.cell, cellStyle].join(" ")}>{dailyTotal}</td>
        })
        }
        <td className={styles.cellBig}>{totalVolume}</td>
        <td className={styles.cellBig}>{Math.trunc(avgPrice)} /=</td>
        <td className={styles.cellBig}>{numberToCommaSeparatedString(Math.trunc(amount))} /=</td>
    </tr>
    )
}