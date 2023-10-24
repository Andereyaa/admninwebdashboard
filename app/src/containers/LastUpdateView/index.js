import React, { Component } from 'react'
import styles from './LastUpdateView.module.css'
import { connect } from "react-redux"

class LastUpdateView extends Component {

    state = {
        lastRefresh: null
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ lastRefresh: Date.now() }), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resolveAgeOfData = (minutesAgo) => {
        if (minutesAgo < 59){
            return `${Math.floor(minutesAgo)} minute${minutesAgo >= 2 ? "s": ""}`
        } else if (minutesAgo >= 60 && minutesAgo < (60 * 24)){
            return `${Math.floor(minutesAgo/60)} hour${Math.round(minutesAgo/60) > 1 ? 's':''}`
        } else if(minutesAgo > (60*24)){
            return `${Math.floor(minutesAgo/(60 *24))} day${Math.round(minutesAgo/(60 *24)) > 1 ? 's' : ''}`
    }
}

    render() {
        const {lastRefresh} = this.state
        let time = Date.now()
        const { centers, periods } = this.props
        if (!centers.selectedId || !periods.selectedId)
            return null
        let minutesAgo = ((time- (periods.periodsById[periods.currentPeriodId]).dateLoadedByCenterId[centers.selectedId]) / 60000)
        return (
            <div className={styles.container} style={{visibility: ((minutesAgo > 5) && lastRefresh) ? 'visible' : 'hidden' }}>
                <span>
                    Last updated over {this.resolveAgeOfData(minutesAgo)} ago
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    centers: state.centers,
    periods: state.periods
})

export default connect(mapStateToProps)(LastUpdateView)