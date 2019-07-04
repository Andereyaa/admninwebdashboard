import React from 'react'
import styles from './PeriodReportTableRow.module.css'

export default ({milkCollectionsByDate = {}, periodStartDate, periodEndDate}) => {
    const numberOfDays = periodEndDate.date() - periodStartDate.date() + 1
    const dayArray = [...Array(numberOfDays).keys()].map(day => day + periodStartDate.date())
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
            const dailyTotal = milkCollectionsByDate[day] ? milkCollectionsByDate[day][0].volumeInLitres : 0     
            return <td className={styles.cell}>{dailyTotal}</td>
        })
        }
        <td className={styles.cellBig}>{totalVolume}</td>
        <td className={styles.cellBig}>{avgPrice}</td>
        <td className={styles.cellBig}>{amount}</td>
    </tr>
    )
}