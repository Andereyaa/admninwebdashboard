import React from 'react'
import styles from './Link.module.css'
export default ({text="link", onClick=()=>{}}) => (
    <span className={styles.container} onClick={onClick}>{text}</span>
)