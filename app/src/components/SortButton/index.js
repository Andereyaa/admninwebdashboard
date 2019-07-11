import React, {Component} from 'react'
import Icon from "../Icon"

import {SORT_DIRECTION_ASC, SORT_DIRECTION_DESC} from '../../constants/misc'
import styles from './SortButton.module.css'

export default ({
        isSorting=false, 
        sortDirection=SORT_DIRECTION_ASC,
        onClick=()=>{}
    }) => {
    const topStyle = !isSorting || (isSorting && sortDirection===SORT_DIRECTION_ASC) ? null : styles.hidden 
    const bottomStyle = !isSorting || (isSorting && sortDirection === SORT_DIRECTION_DESC) ? null : styles.hidden
    return (
        <span className={styles.container} onClick={onClick}>   
            <span className={[styles.top, topStyle].join(" ")}><Icon icon="arrow-drop-up"/></span>
            <span className={[styles.bottom, bottomStyle].join(" ")}><Icon icon="arrow-drop-down"/></span>
        </span>
    )
}