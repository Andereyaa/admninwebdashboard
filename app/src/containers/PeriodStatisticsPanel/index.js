import React, {Component} from 'react'

import Statistic from '../../components/Statistic'

import {connect} from "react-redux"

import styles from './PeriodStatisticsPanel.module.css'

export class PeriodStatisticsPanel extends Component {

    getVolumeCollectedThisPeriod = (milkCollectionsArray) => {
        return milkCollectionsArray.reduce((total,milkCollection) => {
            return total + milkCollection.volumeInLitres
        }, 0)
    }

    getMilkValueThisPeriod = (milkCollectionsArray) => {
        return milkCollectionsArray.reduce((total,milkCollection) => {
            return total + (milkCollection.volumeInLitres * milkCollection.rateInShillings)
        }, 0)
    }

    getMostCommonRateThisPeriod = (milkCollectionsArray) => {
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
        const {milkCollectionsArray} = this.props
        return (
            <div className={styles.container}>
                <Statistic 
                    label="volume collected this period"
                    value={this.getVolumeCollectedThisPeriod(milkCollectionsArray)}
                    units="L"
                    unitsPositionedRight={true}
                />
                <Statistic 
                    label="most common rate this period"
                    value={this.getMostCommonRateThisPeriod(milkCollectionsArray)}
                    units="UGX"
                />
                <Statistic 
                    label="no. milk collections this period"
                    value={milkCollectionsArray.length}
                />
                <Statistic 
                    label="total milk value this period"
                    value={this.getMilkValueThisPeriod(milkCollectionsArray)}
                    units="UGX"
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
});

export default connect(mapStateToProps)(PeriodStatisticsPanel)