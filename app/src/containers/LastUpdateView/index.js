import React, { Component } from 'react'
import styles from './LastUpdateView.module.css'
import moment from "moment-timezone"
import { connect } from "react-redux"

class LastUpdateView extends Component {

    state = {
        time: 0
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { time } = this.state
        const { centers, periods } = this.props
        if (!centers.selectedId) //bug when centers.selectedId is not set before this code executes
            return null

        const minutesAgo = moment(time - (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId]).format('m')

        return (
            <div className={styles.container} style={{visibility: (minutesAgo > 1 ? 'visible' : 'hidden') }}>
                <span>Data Last Updated {minutesAgo} minutes ago ....</span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
})

export default connect(mapStateToProps)(LastUpdateView)