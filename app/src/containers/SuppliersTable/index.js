import React, {Component} from 'react'

import {connect} from "react-redux"

import styles from './SuppliersTable.module.css'

import SuppliersTableRow from '../../components/SuppliersTableRow'
import SuppliersTableHeader from '../../components/SuppliersTableHeader'

export class SuppliersTable extends Component{

    static defaultProps = {
        errors: {}
    }
    
    getRows = (milkCollectionsArray) => {
        const {suppliersArray, errors} = this.props
        return suppliersArray.map((supplier,index) => {
            const error = errors[supplier.id]
            return <SuppliersTableRow 
                        key={supplier.id} 
                        supplier={supplier}
                        even={((index % 2) > 0)}
                        error={error}
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