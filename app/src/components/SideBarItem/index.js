import React from 'react'
import styles from './SideBarItem.module.css'

import Icon from '../Icon'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({text="", icon="", onClick=()=>{}, selected=false}) => {
    const containerStyle = selected ? `${styles.container} ${styles.selected}` : styles.container
    return (
        <div className={containerStyle} onClick={onClick}>
            <Icon icon={icon} />
            <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
        </div>
    )
}