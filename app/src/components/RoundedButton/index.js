import React from 'react'
import styles from './RoundedButton.module.css'

export default ({text="button"}) => (
    <button className={styles.container}>{text}</button>
)