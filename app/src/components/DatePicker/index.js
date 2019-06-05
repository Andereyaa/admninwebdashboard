import React from 'react'
import styles from './DatePicker.module.css'

import moment from 'moment'

export default ({value, onSelect=()=>{}}) => {
    const dateString = moment(value).format('YYYY-MM-DD')
    return <input 
                type="date" 
                value={dateString}
                onChange={event => {
                    onSelect(moment(event.target.value))    
                }} 
            />
}