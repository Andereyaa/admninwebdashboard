import React, {Component} from 'react'

import {connect} from "react-redux"

import styles from './MilkCollectionsTable.module.css'

import MilkCollectionsTableRow from '../../components/MilkCollectionsTableRow'
import MilkCollectionsTableHeader from '../../components/MilkCollectionsTableHeader'

export class MilkCollectionsTable extends Component{
    getRows = (milkCollectionsArray) => {
        const {suppliers} = this.props
        return milkCollectionsArray.map((milkCollection,index) => {
            const supplier = suppliers.suppliersById[milkCollection.supplierId]
            return <MilkCollectionsTableRow 
                        key={milkCollection.id} 
                        milkCollection={milkCollection}
                        supplier={supplier}
                        even={((index % 2) > 0)}
                     />
        })
    }
    render(){
        const {milkCollectionsArray} = this.props
        if (!milkCollectionsArray) return null
        return (
            <div className={styles.container}>
                <MilkCollectionsTableHeader />
                {
                    milkCollectionsArray.length > 0 ?
                    this.getRows(milkCollectionsArray)
                    :
                    <div className={styles.noData}>No Data</div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(MilkCollectionsTable)