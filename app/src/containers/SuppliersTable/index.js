import React, {Component} from 'react'

import {connect} from "react-redux"

import styles from './SuppliersTable.module.css'

import SuppliersTableRow from '../../components/SuppliersTableRow'
import SuppliersTableHeader from '../../components/SuppliersTableHeader'

export class SuppliersTable extends Component{
    getRows = (milkCollectionsArray) => {
        const {suppliersArray} = this.props
        return suppliersArray.map((supplier,index) => {
            return <SuppliersTableRow 
                        key={supplier.id} 
                        supplier={supplier}
                        even={((index % 2) > 0)}
                     />
        })
    }
    render(){
        const {suppliersArray} = this.props
        if (!suppliersArray) return null
        return (
            <div className={styles.container}>
                <SuppliersTableHeader />
                {
                    suppliersArray.length > 0 ?
                    this.getRows(suppliersArray)
                    :
                    <div className={styles.noData}>No Data</div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(SuppliersTable)