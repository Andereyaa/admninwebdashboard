import React from 'react'

import styles from './MilkCollectionsTableRow.module.css'

import MilkCollectionTableCell from '../MilkCollectionsTableCell'

export default ({milkCollection, even=false}) => {
    console.log('even is ', even)
    const evenStyle = even ? styles.even : ""
    return (
        <div className={[styles.container, evenStyle].join(" ")}>
            <MilkCollectionTableCell value="Name"/>
            <MilkCollectionTableCell value={milkCollection.volumeInLitres}/>
            <MilkCollectionTableCell value={milkCollection.rateInShillings}/>
        </div>
    )
}