import React from 'react'
import styles from './MilkCollectionsTableHeader.module.css'

export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.th}>Name</div>
            <div className={styles.th}>Volume (Litres)</div>
            <div className={styles.th}>Price (UGX)</div>
        </div>
    )
}