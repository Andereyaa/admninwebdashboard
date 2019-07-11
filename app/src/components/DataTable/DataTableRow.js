import React from 'react'

import styles from './DataTableRow.module.css'

import DataTableCell from './DataTableCell'
import ReactTooltip from 'react-tooltip'

export default ({data, fields, fieldTransformFunctions, even=false, error=null}) => {
    if (!data) return null
    if(!fields) return null

    const evenStyle = even ? styles.even : ""
    const errorStyle = error ? styles.error : ""
    const tooltipId = `tool-tip${data.id}`

    const getCells = () => {
        return fields.map(field => {
            const transformFunction = fieldTransformFunctions[field] ? fieldTransformFunctions[field] : value => value
            return <DataTableCell key={`${data.id}${field}`} value={transformFunction(data[field])}/>
        })

    }
    return (
        <div 
            className={[styles.container, evenStyle, errorStyle].join(" ")} 
            data-tip={error}
            data-for={tooltipId}
            >
            {getCells()}
            {
                error ?
                <ReactTooltip id={tooltipId}/>
                :
                null
            }
        </div>
    )
}

