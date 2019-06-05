import React, {Component} from 'react'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './MilkCollectionsTable.module.css'

import MilkCollectionsTableRow from '../../components/MilkCollectionsTableRow'

export class MilkCollectionsTable extends Component{
    getRows = (milkCollectionsArray) => {
        return milkCollectionsArray.map(milkCollection => {
            return <MilkCollectionsTableRow 
                        key={milkCollection.id} 
                        milkCollection={milkCollection}
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
                {this.getRows(milkCollectionsArray)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MilkCollectionsTable)