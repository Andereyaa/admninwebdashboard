import React from 'react'
import styles from './CenterTile.module.css'
import Icon from '../Icon'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({id, centerName, onClick=()=>{}}) => {
    return (
        <div className={styles.container} onClick={() => onClick(id)}>
            <Icon icon="business"/>            
            <span>{capitalizeFirstLetterOfAllWords(centerName)}</span>
        </div>
    )
}