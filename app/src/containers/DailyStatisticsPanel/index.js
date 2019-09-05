import React, {Component} from 'react'

import Statistic from '../../components/Statistic'

import {connect} from "react-redux"

import styles from './DailyStatisticsPanel.module.css'
import {numberToCommaSeparatedString} from '../../utils/formatting'
export class DailyStatisticsPanel extends Component {

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
        const {milkCollectionsArray} = this.props
        const volumeCollectedToday = this.getVolumeCollectedToday(milkCollectionsArray)
        const mostCommonRateToday = this.getMostCommonRateToday(milkCollectionsArray)
        const milkValueToday = this.getMilkValueToday(milkCollectionsArray)
        return (
            <div className={styles.container}>
                <Statistic 
                    label="volume collected today"
                    value={volumeCollectedToday ? numberToCommaSeparatedString(volumeCollectedToday ,1) : null}
                    units="L"
                    unitsPositionedRight={true}
                />
                <Statistic 
                    label="most common rate today"
                    value={mostCommonRateToday ? numberToCommaSeparatedString(mostCommonRateToday) : null}
                    units="UGX"
                />
                <Statistic 
                    label="no. milk records today"
                    value={milkCollectionsArray.length}
                />
                <Statistic 
                    label="total milk value today"
                    value={milkValueToday ? numberToCommaSeparatedString(milkValueToday) : null}
                    units="UGX"
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    milkCollections: state.milkCollections,
});

export default connect(mapStateToProps)(DailyStatisticsPanel)