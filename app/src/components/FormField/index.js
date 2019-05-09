import React from 'react'
import Icon from '../Icon'

export default ({label="", icon="", type='text'}) => {
    return (
        <div>
            {icon? <Icon icon={icon}/> : null}            
            <label>{label}</label>
            <input type={type}/>
        </div>
    )
}