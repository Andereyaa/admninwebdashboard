import React from 'react'
import styles from './SideBarItem.module.css'

import Icon from '../Icon'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({text="", icon="", onClick=()=>{}}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <Icon icon={icon} />
            <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
        </div>
    )
}