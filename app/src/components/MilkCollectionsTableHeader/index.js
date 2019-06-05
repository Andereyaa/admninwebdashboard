import React from 'react'
import styles from './MilkCollectionsTableHeader.module.css'

export default () => {
    return (
        <div className={styles.container}>
            <div>Name</div>
            <div>Volume (Litres)</div>
            <div>Price (UGX)</div>
        </div>
    )
}