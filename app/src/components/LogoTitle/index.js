import React from 'react'
import logo from '../../assets/logo.png'
import styles from './LogoTitle.module.css'

export default ({height=100, width=100, title=""}) => (
    <div className={styles.container}>
        <img className={styles.logo} src={logo} height={height} width={width} />
        <div className={styles.title}>{title}</div>
    </div>    
) 