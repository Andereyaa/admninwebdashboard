import React from 'react'
import styles from './TopBar.module.css'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import HamburgerMenu from '../HamburgerMenu'

export default ({text=''}) => (
    <div className={styles.container}>
        <div className={styles.menu}>
            <HamburgerMenu />
        </div>
        {capitalizeFirstLetterOfAllWords(text)}
    </div>
)