import React from 'react'
import styles from './TopBar.module.css'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import HamburgerMenu from '../../containers/HamburgerMenu'

export default ({text='', currentScreenPathname=""}) => (
    <div className={styles.container}>
        <div className={styles.menu}>
            <HamburgerMenu currentScreenPathname={currentScreenPathname}/>
        </div>
        {capitalizeFirstLetterOfAllWords(text)}
    </div>
)