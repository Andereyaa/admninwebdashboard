import React, { Component } from 'react'
import styles from './LastUpdateView.module.css'
import { getMinutesFromMoment } from '../../utils/dateHandling'

import { connect } from "react-redux"

class LastUpdateView extends Component {
    

    state = {}

    render() {
        const { centers, periods } = this.props
        if (!centers.selectedId) //bug when centers.selectedId is not set before this code executes
            return null

        const minutesAgo = getMinutesFromMoment(Date.now() - (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId])

        return (
            minutesAgo > 1 ?
                <div className={styles.container}>
                    <span>Data Last Updated {minutesAgo} minutes ago ....</span>
                </div>
                :
                null
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
})

export default connect(mapStateToProps)(LastUpdateView)