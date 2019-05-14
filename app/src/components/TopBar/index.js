import React from 'react'
import styles from './TopBar.module.css'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({text=''}) => (
    <div className={styles.container}>
        {capitalizeFirstLetterOfAllWords(text)}
    </div>
)