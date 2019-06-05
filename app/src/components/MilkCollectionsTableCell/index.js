import React from 'react'

import styles from './MilkCollectionsTableCell.module.css'

export default ({value}) => {
    return (
        <div className={styles.container}>{value}</div>
    )
}