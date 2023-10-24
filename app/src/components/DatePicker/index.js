import React from 'react'
import styles from './DatePicker.module.css'

import {getMomentLocalToSelectedCountry} from '../../utils/dateHandling'

export default ({value, onSelect=()=>{}, max=null, min=null}) => {
    const dateString = getMomentLocalToSelectedCountry(value).format('YYYY-MM-DD')
    const maxDateString = max ?  getMomentLocalToSelectedCountry(max).format('YYYY-MM-DD') : null
    const minDateString = min ? getMomentLocalToSelectedCountry(min).format('YYYY-MM-DD') : null
    return <input 
                className={styles.container}
                type="date" 
                value={dateString}
                onChange={event => {
                    onSelect(getMomentLocalToSelectedCountry(event.target.value))    
                }} 
                max={maxDateString}
                min={minDateString}
            />
}