import React from 'react'

import styles from './SuppliersTableRow.module.css'

import SuppliersTableCell from '../SuppliersTableCell'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'
import ReactTooltip from 'react-tooltip'

export default ({supplier, even=false, error=null}) => {
    if (!supplier) return null
    const evenStyle = even ? styles.even : ""
    const errorStyle = error ? styles.error : ""
    const tooltipId = `tool-tip${supplier.id}`
    return (
        <div 
            className={[styles.container, evenStyle, errorStyle].join(" ")} 
            data-tip={error}
            data-for={tooltipId}
            >
            <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.supplierName)}/>
            <SuppliersTableCell value={supplier.phoneNumber}/>
            <SuppliersTableCell value={capitalizeFirstLetterOfAllWords(supplier.locationName)}/>
            {
                error ?
                <ReactTooltip id={tooltipId}/>
                :
                null
            }
        </div>
    )
}