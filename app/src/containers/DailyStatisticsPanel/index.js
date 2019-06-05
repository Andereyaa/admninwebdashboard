import React, {Component} from 'react'

import Statistic from '../../components/Statistic'

import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import * as actions from "../../actions";

import styles from './DailyStatisticsPanel.module.css'

import {getLocalStartOfDayTimestamp} from '../../utils/dateHandling'

export class DailyStatisticsPanel extends Component {
    
    getMilkCollectionsForSelectedCenter = (milkCollectionsArray) => {
        const {centers} = this.props
        return milkCollectionsArray.filter(milkCollection => {
            return milkCollection.centerId === centers.selectedId
        })
    }
    getTodaysMilkCollections = (milkCollectionsArray) => {
        const localStartOfDay = getLocalStartOfDayTimestamp()
        return milkCollectionsArray.filter(milkCollection => {
            return milkCollection.dateCollected > localStartOfDay
        })
    }

    getVolumeCollectedToday = (milkCollectionsArray) => {
        return milkCollectionsArray.reduce((total,milkCollection) => {
            return total + milkCollection.volumeInLitres
        }, 0)
    }

    getMilkValueToday = (milkCollectionsArray) => {
        return milkCollectionsArray.reduce((total,milkCollection) => {
            return total + (milkCollection.volumeInLitres * milkCollection.rateInShillings)
        }, 0)
    }

    getMostCommonRateToday = (milkCollectionsArray) => {
        const tally = milkCollectionsArray.reduce((tally, milkCollection) => {
            if (!tally[milkCollection.rateInShillings]) tally[milkCollection.rateInShillings] = 0
            tally[milkCollection.rateInShillings] += 1
            return tally
        }, {})
        let mode = {}
        Object.keys(tally).forEach (rate => {
            const count = tally[rate]
            if (!mode.count || (mode.count < count)){
                mode = {rate, count}
            }
        })
        return mode.rate
    }

    render () {
        const {milkCollections} = this.props
        if (!milkCollections) return null

        const milkCollectionsArray = milkCollections.milkCollectionIds.map(milkCollectionId => {
            return milkCollections.milkCollectionsById[milkCollectionId]
        })

        const milkCollectionsForSelectedCenter = this.getMilkCollectionsForSelectedCenter(milkCollectionsArray)
        const todaysMilkCollections = this.getTodaysMilkCollections(milkCollectionsForSelectedCenter)

        return (
            <div className={styles.container}>
                <Statistic 
                    label="volume collected today"
                    value={this.getVolumeCollectedToday(todaysMilkCollections)}
                    units="L"
                    unitsPositionedRight={true}
                />
                <Statistic 
                    label="most common rate today"
                    value={this.getMostCommonRateToday(todaysMilkCollections)}
                    units="UGX"
                />
                <Statistic 
                    label="no. milk collections today"
                    value={todaysMilkCollections.length}
                />
                <Statistic 
                    label="total milk value today"
                    value={this.getMilkValueToday(todaysMilkCollections)}
                    units="UGX"
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyStatisticsPanel)