import React, { Component } from 'react'
import styles from './LastUpdateView.module.css'

import { connect } from "react-redux"

class LastUpdateView extends Component {

    state={}
    
    render() {
        const { centers, periods } = this.props
        // Date.now() - (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId]

        return (
            <div className={styles.container}>
                <spa>Data Last Updated {Date.now() - (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId]} minutes ago ....</spa>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
})

export default connect(mapStateToProps)(LastUpdateView)