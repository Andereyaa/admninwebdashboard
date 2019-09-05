import React, {Component} from 'react'

import {connect} from "react-redux"

import DataTable from '../../components/DataTable'
import {capitalizeFirstLetterOfAllWords} from '../../utils/formatting'

export class SuppliersTable extends Component{

    static defaultProps = {
        errors: {}
    }
    
    render(){
        const {suppliersArray, errors, emptyText} = this.props
        if (!suppliersArray) return null
        return (
            <div>
                <div style={styles.tableTitle}>
                        Absent Suppliers Today: <strong>{suppliersArray.length}</strong>
                </div>
                <DataTable 
                    dataArray={suppliersArray}
                    fields={['supplierName', 'phoneNumber', 'locationName']}
                    fieldTransformFunctions={{
                        supplierName: capitalizeFirstLetterOfAllWords,
                        locationName: capitalizeFirstLetterOfAllWords
                    }}
                    headings={{
                        supplierName: "Supplier Name",
                        locationName: "Address",
                        phoneNumber: "Phone Number"
                    }}
                    errors={errors}
                    emptyText={emptyText ? emptyText : undefined}
                />
            </div>
        )
    }
}

const styles = {
    tableTitle: {
        'width':'99.9%',
        'color':'var(--primary)',
        'padding':'3px 3px 3px 6px',
        'fontSize': 'var(--title-font)'
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers
});


export default connect(mapStateToProps)(SuppliersTable)