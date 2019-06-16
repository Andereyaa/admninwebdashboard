import React from 'react'
import styles from './DatePicker.module.css'

import moment from 'moment'

export default ({value, onSelect=()=>{}, max=null}) => {
    const dateString = moment(value).format('YYYY-MM-DD')
    const maxDateString = max ?  moment(max).format('YYYY-MM-DD') : null
    return <input 
                className={styles.container}
                type="date" 
                value={dateString}
                onChange={event => {
                    onSelect(moment(event.target.value))    
                }} 
                max={maxDateString}
            />
}