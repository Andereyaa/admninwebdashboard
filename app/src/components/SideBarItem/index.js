import React from 'react'
import styles from './SideBarItem.module.css'

import Icon from '../Icon'

export default ({text="", icon=""}) => {
    return (
        <div className={styles.container}>
            <Icon icon={icon} />
            <span className={styles.text}>{text}</span>
        </div>
    )
}