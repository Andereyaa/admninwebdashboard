import React from 'react'

import styles from './DataTableRow.module.css'

import DataTableCell from './DataTableCell'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'
import ReactTooltip from 'react-tooltip'

export default ({data, fields, even=false, error=null}) => {
    if (!data) return null
    if(!fields) return null

    const evenStyle = even ? styles.even : ""
    const errorStyle = error ? styles.error : ""
    const tooltipId = `tool-tip${data.id}`

    const getCells = () => {
        return fields.map(field => <DataTableCell key={`${data.id}${field}`} value={data[field]}/>)
        {/* <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.supplierName)}/>
            <SuppliersTableCell value={supplier.phoneNumber}/>
            <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.locationName)}/> */}
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

