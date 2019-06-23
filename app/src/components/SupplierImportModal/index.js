import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SupplierImportModal.module.css'
import Button from '../Button'
import FileInput from '../FileInput'

import {parseCsvStringToNewSuppliers} from '../../utils/csvHandling'

Modal.setAppElement("#root")

export class SupplierImportModal extends Component {
    static defaultProps = {
        isOpen: false,
        onAfterOpen: ()=>{},
        onRequestClose: ()=>{}
    }

    handleFileRead = csvString => {
        console.log(parseCsvStringToNewSuppliers(csvString))
    }

    render(){
        const {isOpen, onAfterOpen, onRequestClose, contentLabel} = this.props

        return (
        <Modal 
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel="Import Suppliers" 
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.container}>
                <div className={styles.title}>Import Suppliers</div>
                <div>
                    <div className={styles.instructions}>To import suppliers, select a CSV file</div>
                    <FileInput acceptedFiletype='.csv' onFileRead={this.handleFileRead}/>
                </div>
                <div className={styles.buttonHolder}>
                    <Button text="Cancel" onClick={onRequestClose}/> 
                    <Button text="Import" />
                </div>
            </div>
        </Modal>
        )
    }
}

export default SupplierImportModal