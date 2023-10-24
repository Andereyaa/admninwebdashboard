import React from 'react'
import Icon from '../Icon'
import styles from './FormField.module.css'

export default ({label="", value="", 
                name="", icon="", 
                type='text', customStyles={},
                error=null,
                onChange=()=>{},
                onEnterPress=()=>{}
            }) => {
    
    const handleChangeText = (event) => {
        onChange(event.target.value, name)
    }

    const handleEnterPress = event => {
        if(event.keyCode === 13) onEnterPress()
    }
    return (
        <div className={styles.container} style={customStyles}>
            <label className={styles.label}>{label}</label>
            {error ? <span className={styles.error}>{error}</span> : null }
            <div className={styles.field}>
                <span className={styles.icon}>{icon? <Icon icon={icon}/> : null}</span> 
                <input 
                    className={styles.input} 
                    type={type} 
                    value={value} 
                    onChange={handleChangeText}
                    onKeyDown={handleEnterPress}
                />
            </div>
        </div>
    )
}