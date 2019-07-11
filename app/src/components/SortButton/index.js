import React from 'react'
import Icon from "../Icon"

import styles from './SortButton.module.css'

export default ({}) => (
    <span className={styles.container}>   
        <span className={styles.top}><Icon icon="arrow-drop-up"/></span>
        <span className={styles.bottom}><Icon icon="arrow-drop-down"/></span>
    </span>
)