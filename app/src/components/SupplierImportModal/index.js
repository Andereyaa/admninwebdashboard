import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement("#root")

export class SupplierImportModal extends Component {
    static defaultProps = {
        isOpen: false,
        onAfterOpen: ()=>{},
        onRequestClose: ()=>{}
    }

    render(){
        const {isOpen, onAfterOpen, onRequestClose, contentLabel} = this.props

        return (
        <Modal 
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel="Import Suppliers"
        >
            <div>Import Suppliers</div>
        </Modal>
        )
    }
}

export default SupplierImportModal