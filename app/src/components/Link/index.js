import React from 'react'
import styles from './Link.module.css'
export default ({text="link"}) => (
    <a className={styles.container}>{text}</a>
)