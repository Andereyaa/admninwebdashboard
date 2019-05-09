import React from 'react'
import Icon from '../Icon'

export default ({label="", type='text'}) => {
    return (
        <div>
            <Icon />            
            <label>{label}</label>
            <input type={type}/>
        </div>
    )
}