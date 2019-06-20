import React from 'react'
import styles from './Button.module.css'

export default ({text="button", onClick=()=>{}}) => (
    <button className={styles.container} onClick={onClick}>{text}</button>
)