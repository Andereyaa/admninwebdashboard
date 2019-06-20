import React, {Fragment} from 'react'
import styles from './SideBarItem.module.css'

import Icon from '../Icon'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

import { Link } from 'react-router-dom';

export default ({text="", icon="", pathname, onClick, selected=false}) => {
    const containerStyle = selected ? `${styles.container} ${styles.selected}` : styles.container
    return (
        <Fragment>
            {
                onClick ?

                <div className={containerStyle} onClick={onClick}>
                    <Icon icon={icon} />
                    <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
                </div>

                :
                <Link 
                    className={containerStyle}
                    to={{pathname}}
                >
                    <Icon icon={icon} />
                    <span className={styles.text}>{capitalizeFirstLetterOfAllWords(text)}</span>
                </Link>
            }
        </Fragment>
    )
}