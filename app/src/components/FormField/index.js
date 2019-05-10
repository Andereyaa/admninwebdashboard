import React from 'react'
import Icon from '../Icon'
import styles from './FormField.module.css'

export default ({label="", value="", 
                name="", icon="", 
                type='text', customStyles={},
                onChange=()=>{}
            }) => {
    
    const onChangeText = (event) => {
        onChange(event.target.value, name)
    }
    return (
        <div className={styles.container} style={customStyles}>
            <label className={styles.label}>{label}</label>
            <div className={styles.field}>
                <span className={styles.icon}>{icon? <Icon icon={icon}/> : null}</span> 
                <input className={styles.input} type={type} value={value} onChange={onChangeText}/>
            </div>
        </div>
    )
}