import React from 'react'
import styles from './CenterTile.module.css'
import Icon from '../Icon'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({id, centerName, selected = false, onClick=()=>{}}) => {
    const selectedClass = selected ? styles.selected : ""
    return (
        <div className={[styles.container, selectedClass].join(" ")} onClick={() => onClick(id)}>
            <div className={styles.innerContainer}>
                <Icon icon="business"/>            
                <span>{capitalizeFirstLetterOfAllWords(centerName)}</span>
            </div>
        </div>
    )
}