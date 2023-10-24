import React from 'react'
import styles from './Button.module.css'

export default ({text="button", onClick=()=>{}, disabled=false}) => {
    const disabledStyle = disabled ? styles.disabled : null
    return (
    <button 
        className={[styles.container, disabledStyle].join(" ")} 
        onClick={onClick}
        disabled={disabled}
        >
            {text}
        </button>
    )
}