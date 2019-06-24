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
import {v4 as uuid4} from 'uuid'

Modal.setAppElement("#root")

export class SupplierImportModal extends Component {

    state = {
        newSuppliers: [],
        errors: {}
    }
    supplierType = "farmer"

    static defaultProps = {
        isOpen: false,
        onAfterOpen: ()=>{},
        onRequestClose: ()=>{},
    }

    handleFileRead = csvString => {
        const newSuppliers = this.parseCsvStringToNewSuppliers(csvString)
        this.setState({newSuppliers})
        this.validate(newSuppliers)
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
                const supplierName = supplierData[0].trim() ? supplierData[0].trim().toLowerCase() : null
                const phoneNumber = supplierData[1].trim() ? supplierData[1].trim() : null
                const locationName = supplierData[2].trim() ? supplierData[2].trim().toLowerCase() : null
                const newSupplier = {supplierName,phoneNumber,locationName,id: uuid4()}
                newSuppliers.push(newSupplier)
            }
        })
        return newSuppliers
    }

    validate = newSuppliers => {
        const errors = {}
        newSuppliers.forEach(newSupplier => {
            if (!newSupplier.supplierName) errors[newSupplier.id] = 'Suppliers must have a name'
            if (!newSupplier.locationName) errors[newSupplier.id] = 'Suppliers must have an address'
        })
        this.setState({errors})
        return (Object.keys(errors).length === 0)
    }

    handleAddNewSuppliers = async () => {
        const {newSuppliers} = this.state
        const {actions} = this.props
        if (this.validate(newSuppliers)){
            newSuppliers.forEach(async newSupplier => {
                const {supplierName, phoneNumber, locationName, id} = newSupplier
                // const success = await actions.fetchAddSupplier(
                //     supplierName, 
                //     phoneNumber, 
                //     locationName,
                //     this.supplierType, //TODO let user specify supplier type
                //     id
                // )
                console.log("success is ", newSupplier)
            })
            this.handleCloseModal()
        }
    }

    render(){
        const {isOpen, onAfterOpen, onRequestClose, contentLabel} = this.props
        const {newSuppliers, errors} = this.state
        console.log("errors are ", errors)
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
                        <SuppliersTable suppliersArray={newSuppliers} errors={errors}/>
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