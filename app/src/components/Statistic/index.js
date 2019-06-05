import React from 'react'
import styles from './Statistic.module.css'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({label="", value="", units="", unitsPositionedRight=false}) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{capitalizeFirstLetterOfAllWords(label)}</div>
            <div className={styles.valueContainer}>
                {
                    value ?
                        <React.Fragment>
                            {
                                units && !unitsPositionedRight ?
                                    <div className={[styles.units, styles.unitsLeft].join(" ")}>{units}</div>
                                :
                                null
                            }
                            <div>{value}</div>
                            {
                                units && unitsPositionedRight ?
                                    <div className={[styles.units, styles.unitsRight].join(" ")}>{units}</div>
                                :
                                null
                            }
                        </React.Fragment>
                    :
                    <div>--</div>
                }
            </div>
        </div>
    )
}