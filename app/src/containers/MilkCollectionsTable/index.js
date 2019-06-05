import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './MilkCollectionsTable.module.css'

import MilkCollectionsTableRow from '../../components/MilkCollectionsTableRow'
import MilkCollectionsTableHeader from '../../components/MilkCollectionsTableHeader'

export class MilkCollectionsTable extends Component{
    getRows = (milkCollectionsArray) => {
        const {suppliers} = this.props
        return milkCollectionsArray.map((milkCollection,index) => {
            const supplier = suppliers.suppliersById[milkCollection.supplierId]
            return <MilkCollectionsTableRow 
                        key={milkCollection.id} 
                        milkCollection={milkCollection}
                        supplier={supplier}
                        even={((index % 2) > 0)}
                     />
        })
    }
    render(){
        const {milkCollections} = this.props
        const milkCollectionsArray = milkCollections.milkCollectionIds.map(milkCollectionId => {
            return milkCollections.milkCollectionsById[milkCollectionId]
        })
        return (
            <div className={styles.container}>
                <MilkCollectionsTableHeader />
                {this.getRows(milkCollectionsArray)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
    suppliers: state.suppliers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MilkCollectionsTable)