import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SupplierImportModal.module.css'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import SuppliersTable from '../SuppliersTable'

import {parseCsvStringToNewSuppliers} from '../../utils/csvHandling'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import {bindActionCreators} from 'redux'

Modal.setAppElement("#root")

export class SupplierImportModal extends Component {

    state = {
        newSuppliers: []
    }

    static defaultProps = {
        isOpen: false,
        onAfterOpen: ()=>{},
        onRequestClose: ()=>{},
    }

    handleFileRead = csvString => {
        this.setState({newSuppliers: parseCsvStringToNewSuppliers(csvString)})
    }

    handleCloseModal = () => {
        const { onRequestClose } = this.props
        this.setState({newSuppliers: []})
        onRequestClose()
    }

    supplierType = "farmer"

    handleAddNewSuppliers = async () => {
        const {newSuppliers} = this.state
        const {actions} = this.props
        newSuppliers.forEach(async newSupplier => {
            const {supplierName, phoneNumber, locationName} = newSupplier
            const success = await actions.fetchAddSupplier(
                supplierName, 
                phoneNumber, 
                locationName,
                this.supplierType //TODO let user specify supplier type
            )
            console.log("success is ", success)
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