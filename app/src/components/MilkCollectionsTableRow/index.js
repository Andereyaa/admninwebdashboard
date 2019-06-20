import React from 'react'

import styles from './MilkCollectionsTableRow.module.css'

import MilkCollectionTableCell from '../MilkCollectionsTableCell'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export default ({milkCollection, supplier, even=false}) => {
    if (!milkCollection || !supplier) return null
    const evenStyle = even ? styles.even : ""
    return (
        <div className={[styles.container, evenStyle].join(" ")}>
            <MilkCollectionTableCell value={capitalizeFirstLetterOfAllWords(supplier.supplierName)}/>
            <MilkCollectionTableCell value={milkCollection.volumeInLitres}/>
            <MilkCollectionTableCell value={milkCollection.rateInShillings}/>
        </div>
    )
}