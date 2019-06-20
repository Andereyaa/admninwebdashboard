import React, {Component} from 'react'

import styles from './Suppliers.module.css'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import SupplierTable from '../../containers/SuppliersTable'

export class Suppliers extends Component {
    render(){
        const {suppliers} = this.props
        if(!suppliers) return null
        const suppliersArray = suppliers.supplierIds.map(supplierId => {
            return suppliers.suppliersById[supplierId]
        })
        return (
            <div className={styles.container}>
                <SupplierTable suppliersArray={suppliersArray}/>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)