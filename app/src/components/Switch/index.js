import React from 'react'
import styles from './Switch.module.css'

export default ({options=[{text: '', value: ""}]}) => {
    
    return (
        <div className={styles.container}>
            {
                options.map((option, i) => {
                    const selected = (i > 0)
                    const selectedStyle = selected ? styles.selected : ""
                    return <span className={[styles.option, selectedStyle].join(" ")}>{option.text}</span>
                })
            }
        </div>
    )
}