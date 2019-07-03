import React from 'react'
import styles from './Switch.module.css'

export default ({options=[{text: '', value: ""}], selectedValue, onSelect=()=>{}}) => {
    return (
        <div className={styles.container}>
            {
                options.map(option => {
                    const selectedStyle = option.value === selectedValue ? styles.selected : ""
                    return <span 
                                className={[styles.option, selectedStyle].join(" ")}
                                onClick={() => onSelect(option.value)}
                            >
                                {option.text}
                            </span>
                })
            }
        </div>
    )
}