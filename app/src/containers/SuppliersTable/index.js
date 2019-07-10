import React, {Component} from 'react'

import {connect} from "react-redux"

import DataTable from '../../components/DataTable'
export class SuppliersTable extends Component{

    static defaultProps = {
        errors: {}
    }
    
    render(){
        const {suppliersArray, errors} = this.props
        if (!suppliersArray) return null
        return (
            <DataTable 
                dataArray={suppliersArray}
                fields={['supplierName', 'phoneNumber', 'locationName']}
                headings={{
                    supplierName: "Supplier Name",
                    locationName: "Address",
                    phoneNumber: "Phone Number"
                }}
                errors={errors}
            />
        )
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(SuppliersTable)