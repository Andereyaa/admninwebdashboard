import React, {Component} from 'react'

import {connect} from "react-redux"

import DataTable from '../../components/DataTable'
import {capitalizeFirstLetterOfAllWords, addCurrencySymbol} from '../../utils/formatting'

export class MilkCollectionsTable extends Component{

    render(){
        const {milkCollectionsArray, suppliers, tableTitle} = this.props
        if (!milkCollectionsArray) return null
        const dataArray = milkCollectionsArray.map(milkCollection => {
            const supplier = suppliers.suppliersById[milkCollection.supplierId]
            const supplierName = supplier ? supplier.supplierName : 'N/A' 
            return {...milkCollection, supplierName: supplierName}
        })
        return (

            <div>
                <div style={styles.tableTitle}>
                    {tableTitle} : <strong>{milkCollectionsArray.length}</strong>
                </div>
                <DataTable 
                    dataArray={dataArray}
                    fields={['supplierName', 'volumeInLitres', 'rateInShillings']}
                    fieldTransformFunctions={{
                        supplierName: capitalizeFirstLetterOfAllWords,
                        rateInShillings: addCurrencySymbol
                    }}
                    headings={{
                        supplierName: "Supplier Name",
                        volumeInLitres: "Volume (Litres)",
                        rateInShillings: "Price (UGX)"
                    }}
                />
            </div>
        )
    }
}

const styles = {
    tableTitle: {
        'width':'99.9%',
        'color':'var(--primary)',
        'padding':'3px 3px 3px 6px',
        'fontSize': 'var(--title-font)'
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(MilkCollectionsTable)