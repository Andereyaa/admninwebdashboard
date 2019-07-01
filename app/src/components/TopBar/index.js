import React from 'react'
import styles from './TopBar.module.css'

import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import HamburgerMenu from '../../containers/HamburgerMenu'
import EnvironmentBadge from '../../containers/EnvironmentBadge'
import VersionBadge from '../../containers/VersionBadge'

export default ({text='', currentScreenPathname=""}) => (
    <div className={styles.container}>
        <div className={styles.badges}>
            <EnvironmentBadge />
            <span className={styles.versionBadge}><VersionBadge /></span>
        </div>
        <div className={styles.menu}>
            <HamburgerMenu currentScreenPathname={currentScreenPathname}/>
        </div>
        {capitalizeFirstLetterOfAllWords(text)}
    </div>
)