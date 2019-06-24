import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SupplierImportModal.module.css'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import SuppliersTable from '../SuppliersTable'

import {connect} from 'react-redux'
import * as actions from '../../actions'
import {bindActionCreators} from 'redux'
import {parse} from 'papaparse'

Modal.setAppElement("#root")

export class SupplierImportModal extends Component {

    state = {
        newSuppliers: []
    }
    supplierType = "farmer"

    static defaultProps = {
        isOpen: false,
        onAfterOpen: ()=>{},
        onRequestClose: ()=>{},
    }

    handleFileRead = csvString => {
        this.setState({newSuppliers: this.parseCsvStringToNewSuppliers(csvString)})
    }

    handleCloseModal = () => {
        const { onRequestClose } = this.props
        this.setState({newSuppliers: []})
        onRequestClose()
    }

    parseCsvStringToNewSuppliers = csvString => {
        const results = parse(csvString)
        const newSuppliers = []
        results.data.forEach(supplierData => {
            if (supplierData.length >= 3){
                const newSupplier = {}
                newSupplier.supplierName = supplierData[0] ? supplierData[0] : null
                newSupplier.phoneNumber = supplierData[1] ? supplierData[1] : null
                newSupplier.locationName = supplierData[2] ? supplierData[2] : null
                newSuppliers.push(newSupplier)
            }
        })
        return newSuppliers
    }

    handleAddNewSuppliers = async () => {
        const {newSuppliers} = this.state
        const {actions} = this.props
        newSuppliers.forEach(async newSupplier => {
            const {supplierName, phoneNumber, locationName} = newSupplier
            // const success = await actions.fetchAddSupplier(
            //     supplierName, 
            //     phoneNumber, 
            //     locationName,
            //     this.supplierType //TODO let user specify supplier type
            // )
            console.log("success is ", newSupplier)
        })
        this.handleCloseModal()
    }

    render(){
        const {isOpen, onAfterOpen, onRequestClose, contentLabel} = this.props
        const {newSuppliers} = this.state
        const modalStyle = newSuppliers.length > 0 ? styles.large : null
        return (
        <Modal 
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={this.handleCloseModal}
            contentLabel="Import Suppliers" 
            className={[styles.modal, modalStyle].join(' ')}
            overlayClassName={styles.overlay}
        >
            <div className={styles.container}>
                <div className={styles.title}>Import Suppliers</div>
                <div>
                    <div className={styles.instructions}>To import suppliers, select a CSV file</div>
                    <div className={styles.fileInput}>
                        <FileInput acceptedFiletype='.csv' onFileRead={this.handleFileRead}/>
                    </div>
                    {
                        newSuppliers.length > 0?
                        <SuppliersTable suppliersArray={newSuppliers}/>
                        :
                        null
                    }
                </div>
                <div className={styles.buttonHolder}>
                    <Button text="Cancel" onClick={this.handleCloseModal}/> 
                    <Button text="Import" onClick={this.handleAddNewSuppliers}/>
                </div>
            </div>
        </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})
export default connect(null, mapDispatchToProps)(SupplierImportModal)