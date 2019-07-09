import React from 'react'
import styles from './PeriodPicker.module.css'
import moment from 'moment'

export default ({periods, selectedId, onSelect=()=>{}}) => {

    const getOptions = () => {
        return periods.map(period => {
            const {startDate, endDate} = period
            const formatString = "Do MMMM YYYY"
            return <option key={period.id} value={period.id}>
                    {`${moment(startDate).format(formatString)} to ${moment(endDate).format(formatString)}`}
                    </option>
        })
    }
    return <select
                className={styles.container} 
                value={selectedId ? selectedId : ""}
                onChange={e => onSelect(e.target.value)}
            >
                {getOptions()}
            </select>
}