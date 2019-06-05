import React, {Component} from 'react'
import CenterSelect from '../../containers/CenterSelect'
import DailyStatisticsPanel from '../../containers/DailyStatisticsPanel'
import MilkCollectionsTable from '../../containers/MilkCollectionsTable'

import styles from './Dashboard.module.css'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

export class Dashboard extends Component {
    getMilkCollectionsForSelectedCenter = (milkCollectionsArray) => {
        const {centers} = this.props
        return milkCollectionsArray.filter(milkCollection => {
            return milkCollection.centerId === centers.selectedId
        })
    }

    render (){
        const {milkCollections} = this.props
        const milkCollectionsArray = milkCollections.milkCollectionIds.map(milkCollectionId => {
            return milkCollections.milkCollectionsById[milkCollectionId]
        })
        const milkCollectionsForSelectedCenter = this.getMilkCollectionsForSelectedCenter(milkCollectionsArray)

        return (
            <div className={styles.container}>
                <CenterSelect />
                <DailyStatisticsPanel milkCollectionsArray={milkCollectionsForSelectedCenter}/>
                <MilkCollectionsTable milkCollectionsArray={milkCollectionsForSelectedCenter}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
    centers: state.centers
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)