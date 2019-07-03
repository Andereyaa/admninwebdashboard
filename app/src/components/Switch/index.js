import React from 'react'
import styles from './Switch.module.css'

export default ({options=[{text: '', value: ""}]}) => {
    return (
        <div className={styles.container}>
            {
                options.map(option => <span className={styles.option}>{option.text}</span>)
            }
        </div>
    )
}