import React from 'react'

import styles from './SuppliersTableCell.module.css'

export default ({value}) => {
    return (
        <div className={styles.container}>{value}</div>
    )
}