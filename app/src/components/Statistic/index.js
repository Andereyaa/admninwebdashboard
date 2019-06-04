import React from 'react'
import styles from './Statistic.module.css'

export default ({label="", value="", units="", unitsPositionedRight=false}) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.valueContainer}>
                {
                    units && !unitsPositionedRight ?
                        <div className={styles.units}>{units}</div>
                    :
                    null
                }
                <div>{value}</div>
                {
                    units && unitsPositionedRight ?
                        <div className={styles.units}>{units}</div>
                    :
                    null
                }
            </div>
        </div>
    )
}