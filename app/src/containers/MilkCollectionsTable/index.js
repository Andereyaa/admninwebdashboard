import React, {Component} from 'react'

import {connect} from "react-redux"

import DataTable from '../../components/DataTable'
import {capitalizeFirstLetterOfAllWords, addCurrencySymbol} from '../../utils/formatting'

export class MilkCollectionsTable extends Component{

    render(){
        const {milkCollectionsArray, suppliers} = this.props
        if (!milkCollectionsArray) return null
        const dataArray = milkCollectionsArray.map(milkCollection => {
            const supplier = suppliers.suppliersById[milkCollection.supplierId]
            return {...milkCollection, supplierName: supplier.supplierName}
        })
        return (

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
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(MilkCollectionsTable)