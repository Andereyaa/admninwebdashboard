import React from 'react'
import styles from './SuppliersTableHeader.module.css'

export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.th}>Name</div>
            <div className={styles.th}>Phone Number</div>
            <div className={styles.th}>Address</div>
        </div>
    )
}