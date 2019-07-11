import React, {Component} from 'react'
import styles from './DataTable.module.css'
import DataTableRow from './DataTableRow'

export default class DataTable extends Component {

    static defaultProps = {
        errors: {},
        headings: {},
        fieldTransformFunctions: {}
    }
    
    getHeader = () => {
        const {headings, fields} = this.props
        return (
        <div className={styles.headerContainer}>
            {
                fields.map(
                    field => <div key={`${field}header`} className={styles.th}>
                                {headings[field] ? headings[field] : field}
                            </div>
                )
            }
        </div>
        )
    }

    getRows = (dataArray) => {
        const {errors, fields, fieldTransformFunctions} = this.props
        return dataArray.map((data, index) => {
            const error = errors[data.id]
            return <DataTableRow
                    key={data.id}
                    data={data}
                    fields={fields}
                    fieldTransformFunctions={fieldTransformFunctions}
                    even={((index % 2) > 0)}
                    error={error}
                />
        })
    }

    render (){
        const {dataArray} = this.props
        if (!dataArray) return null
        return (
            <div className={styles.container}>
                {this.getHeader()}
                <div className={styles.rowContainer}>
                {
                    dataArray.length > 0 ?
                    this.getRows(dataArray)
                    :
                    <div className={styles.noData}>No Data</div>
                }
                </div>
            </div>
        )
    }
}