import React, {Component} from 'react'

import styles from './Suppliers.module.css'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import SupplierTable from '../../containers/SuppliersTable'
import Button from '../../components/Button'
import SupplierImportModal from '../../components/SupplierImportModal'

export class Suppliers extends Component {

    state = {
        supplierImportModalIsOpen: false
    }
    render(){
        const {suppliers} = this.props
        if(!suppliers) return null
        const suppliersArray = suppliers.supplierIds.map(supplierId => {
            return suppliers.suppliersById[supplierId]
        })
        const {supplierImportModalIsOpen} = this.state
        return (
            <div className={styles.container}>
                <div className={styles.importButtonContainer}>
                    <Button text="Import Suppliers" onClick={()=>this.setState({supplierImportModalIsOpen: true})}/>                    
                </div>
                <SupplierImportModal 
                    isOpen={supplierImportModalIsOpen}
                />
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