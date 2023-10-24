import React, {Component} from 'react'

import styles from './Suppliers.module.css'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import SuppliersTable from '../../containers/SuppliersTable'
import CenterDropdown from '../../containers/CenterDropdown'

import Button from '../../components/Button'
import SupplierImportModal from '../../containers/SupplierImportModal'
import {trackPageView} from "../../config/googleAnalytics"
import {capitalizeFirstLetterOfAllWords} from "../../utils/formatting"
export class Suppliers extends Component {

    state = {
        supplierImportModalIsOpen: false
    }

    componentDidMount(){
        trackPageView(this.props.match.path);
    }

    handleOpenModal = () => this.setState({supplierImportModalIsOpen: true})
    handleCloseModal = () => this.setState({supplierImportModalIsOpen: false})
    render(){
        const {suppliers, centers} = this.props
        if(!suppliers || !centers) return null
        const suppliersArray = suppliers.supplierIds.reduce( (suppliersArray, supplierId) => {
            const supplier = suppliers.suppliersById[supplierId]
            if (supplier.createdByCenterId === centers.selectedId) suppliersArray.push(supplier)
            return suppliersArray
        }, [])
        const {supplierImportModalIsOpen} = this.state
        const center = centers.centersById[centers.selectedId]
        return (
            <div className={styles.container}>
                <div className={styles.supplierCenter}>Showing Suppliers For <CenterDropdown/> </div>
                <div className={styles.importButtonContainer}>
                    <Button text="Import Suppliers" onClick={this.handleOpenModal}/>                    
                </div>
                <SupplierImportModal 
                    isOpen={supplierImportModalIsOpen}
                    onRequestClose={this.handleCloseModal}
                />
                <SuppliersTable 
                    suppliersArray={suppliersArray} 
                    tableTitle={`Suppliers Registered At ${center ? capitalizeFirstLetterOfAllWords(center.centerName) : ""}`}
                    emptyText={`No Suppliers Registered At ${center ? capitalizeFirstLetterOfAllWords(center.centerName) : ""}`}
                />
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers,
    centers: state.centers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)