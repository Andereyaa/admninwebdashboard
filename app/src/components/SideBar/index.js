import React from 'react'
import styles from './SideBar.module.css'
import SideBarItem from '../SideBarItem'

export default ({}) => {
    return (
        <div className={styles.container}>
            <SideBarItem text="dashboard"/>
            <SideBarItem text="logout"/>
        </div>
    )   
}